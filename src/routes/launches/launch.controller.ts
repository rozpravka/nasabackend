import { Request, Response } from 'express';
import { getAllScheduledLaunches, getLatestLaunch, scheduleLaunch, existsLaunchWithId, abortLaunchById } from 'src/models/launch.model';

export async function httpGetAllScheduledLaunches(_: Request, res: Response) {
  return res.status(200).json(await getAllScheduledLaunches());
}

export async function httpGetLatestLaunch(_: Request, res: Response) {
    return res.status(200).json(await getLatestLaunch());
}

export async function httpScheduleLaunch(req: Request, res: Response) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) return res.status(400).json({ error: "Missing launch data" });
    else if (isNaN(new Date(launch.launchDate).valueOf())) return res.status(400).json({ error: "Invalid launch date" });
    else return res.status(201).json(await scheduleLaunch(launch));
}

export async function httpAbortLaunch(req: Request, res: Response) {
    const launchId: string = req.body.launch.id;
    const launch = await existsLaunchWithId(launchId);
    if (launch == null) return res.status(404).json({ error: "Launch not found" });
    else {
        const aborted = await abortLaunchById(launchId);
        if (!aborted) return res.status(400).json({ error: "Launch hasn't been aborted" });
        else return res.status(200).json({ ok: true });
    }
}