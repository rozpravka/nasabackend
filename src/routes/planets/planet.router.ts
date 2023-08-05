import express from 'express';
import { httpGetAllPlanets } from './planet.controller'

export const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);
