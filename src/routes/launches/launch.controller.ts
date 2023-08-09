import { Request, Response } from 'express';
import { getAllScheduledLaunches, getLatestLaunch, scheduleLaunch, existsLaunchWithId, abortLaunchById } from '../../models/launch.model';

export async function httpGetAllScheduledLaunches(_: Request, res: Response) {
  return res.status(200).json(await getAllScheduledLaunches());
}

export async function httpGetLatestLaunch(_: Request, res: Response) {
    if (!await getLatestLaunch()) return res.status(404).json({ error: "No launches exist" });
    else return res.status(200).json(await getLatestLaunch());
}

export async function httpScheduleLaunch(req: Request, res: Response) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.destinationName || !launch.launchDate) return res.status(400).json({ error: "Missing launch data" });
    else if (isNaN(new Date(launch.launchDate).valueOf())) return res.status(400).json({ error: "Invalid launch date" });
    else return res.status(201).json(await scheduleLaunch(launch));
}

export async function httpAbortLaunch(req: Request, res: Response) {
    const launchId: string = req.body.id;
    const exists: boolean = await existsLaunchWithId(launchId);
    if (!exists) return res.status(404).json({ error: "Launch with specified ID does not exist or has already been aborted" });
    else {
        const aborted = await abortLaunchById(launchId);
        if (!aborted) return res.status(400).json({ error: "Launch hasn't been aborted" });
        else return res.status(200).json({ ok: true });
    }
}