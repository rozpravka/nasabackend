import { PrismaClient, Launch, Planet } from "@prisma/client";
const prisma = new PrismaClient();

async function populateLaunches(): Promise<void> {
    try {
        const planets = (await prisma.planet.findMany()).flatMap((planet: Planet) => planet.keplerName);
        const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
        if (!randomPlanet) throw new Error("Could not find a random planet!");
        const timestamp = Date.now().toString();
        await prisma.launch.create({
            data: {
                launchDate: new Date(parseInt(timestamp)).toISOString(),
                mission: "FirstMission",
                rocket: "FirstRocket",
                customers: ["NASA"],
                upcoming: true,
                success: true,
                destinationName: randomPlanet,
            },
        });
        console.log("Default launch created!");
    } catch (err) {
        console.log(err);
    }
}

export async function loadLaunchData(): Promise<void> {
  const firstLaunch: Launch | null = await prisma.launch.findFirst({
    where: {
        rocket: "FirstRocket",
        mission: "FirstMission",
    },
  });

  if (firstLaunch || (await prisma.launch.count() > 0)) console.log("launch data already loaded");
  else await populateLaunches();
}

export async function existsLaunchWithId(id: string): Promise<boolean> {
    const launch: Launch | null= await prisma.launch.findUnique(
        { 
            where: { 
                launchId: id,
                upcoming: true,
                success: true, 
            } 
        }
    );
    if (launch) return true;
    else return false;
}

async function existsLaunch(mission: string, rocket: string, launchDate: string): Promise<boolean> {
    const timestamp = Date.parse(launchDate);
    const date = new Date(timestamp).toISOString();
    const possiblyNewLaunch = await prisma.launch.findFirst({
        where: { 
            mission: mission, 
            rocket: rocket, 
            launchDate: date
        },
    });
    if (possiblyNewLaunch) return true;
    else return false;
}

export async function getAllScheduledLaunches(): Promise<Launch[]> {
    return await prisma.launch.findMany(
        {
            where: {
                upcoming: true,
                success: true,
            },
        }
    );
}

export async function getLatestLaunch() {
    try {
        const latestLaunch = await prisma.launch.findMany({
            orderBy: {
            createdAt: "desc",
            },
            take: 1,
        });
        return latestLaunch[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function scheduleLaunch(launch: Launch | any): Promise<void> {
    try {
        const targetPlanet = await prisma.planet.findUnique({
            where: { keplerName: launch.destinationName },
        });
        const isSaved = await existsLaunch(launch.mission, launch.rocket, launch.launchDate);
        if (!targetPlanet) throw new Error("No matching planet found!"); 
        else if (isSaved) throw new Error("Launch already exists!");
        else {
            const timestamp = Date.parse(launch.launchDate);
            const date = new Date(timestamp).toISOString();
            await prisma.launch.create({ 
                data: {
                    destinationName: launch.destinationName,
                    mission: launch.mission,
                    rocket: launch.rocket,
                    launchDate: date,
                    customers: ["NASA"],
                    upcoming: true,
                    success: true
                }
            });
            console.log(`Launch ${launch.mission} is scheduled!`);
        }
    } catch (err) {
        console.log(err);
    }
}

export async function abortLaunchById(id: string): Promise<boolean> {
    try {
        const scheduledLaunchesBefore: Launch[] = await getAllScheduledLaunches();
        console.log(`There are ${scheduledLaunchesBefore.length} scheduled launches.`);
        await prisma.launch.update({
            where: { launchId: id },
            data: { upcoming: false, success: false },
        });
        console.log(`Launch ${id} has been aborted.`);
        const scheduledLaunches: Launch[] = await getAllScheduledLaunches();
        console.log(`The updated number of scheduled launches is ${scheduledLaunches.length}.`);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}