import { Request, Response } from 'express';
import { getAllPlanets } from '../../models/planet.model';

export async function httpGetAllPlanets(_: Request, res: Response) {
    return res.status(200).json(await getAllPlanets());
}