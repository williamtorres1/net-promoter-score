import { Request, Response } from 'express';
import { SurveysRepository } from 'src/repositories/SurveysRepository';
import { getCustomRepository } from 'typeorm';

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({ title, description });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRepository.find();

    return response.json(allSurveys);
  }
}

export { SurveysController };
