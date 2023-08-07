import express from 'express';
import { httpGetAllScheduledLaunches,
         httpGetLatestLaunch,
         httpScheduleLaunch,
         httpAbortLaunch } from './launch.controller'

export const launchesRouter = express.Router();

launchesRouter.use(express.json());

launchesRouter.get('/getAll', httpGetAllScheduledLaunches);
launchesRouter.get('/getLatest', httpGetLatestLaunch);
launchesRouter.post('/add', httpScheduleLaunch);
launchesRouter.post('/abort', httpAbortLaunch);