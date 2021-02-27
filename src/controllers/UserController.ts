import { Request, Response } from 'express';
import { UsersRepository } from 'src/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'User already exists.' });
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return response.json(user);
  }
}

export { UserController };
