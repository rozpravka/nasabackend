import express from 'express';
import { httpGetAllScheduledLaunches,
         httpGetLatestLaunch,
         httpScheduleLaunch,
         httpAbortLaunch } from './launch.controller'

export const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllScheduledLaunches);
launchesRouter.get('/latest', httpGetLatestLaunch);
launchesRouter.post('/', httpScheduleLaunch);
launchesRouter.delete('/abort', httpAbortLaunch);