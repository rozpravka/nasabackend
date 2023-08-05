import { PrismaClient, Launch, Planet } from "@prisma/client";
const prisma = new PrismaClient();

async function populateLaunches() {
    try {
        const planets = (await prisma.planet.findMany()).flatMap((planet: Planet) => planet.keplerName);
        const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
        if (!randomPlanet) throw new Error("Could not find a random planet!");
        await prisma.launch.create({
            data: {
                destinationName: randomPlanet,
                mission: "FirstMission",
                rocket: "FirstRocket",
                launchDate: Date.now().toString(),
                customers: ["NASA"],
                upcoming: true,
                success: true,
            },
        });
        console.log("Default launch created!");
    } catch (err) {
        console.log(err);
    }
}

export async function loadLaunchData() {
  const firstLaunch: Launch | null = await prisma.launch.findFirst({
    where: {
        rocket: "FirstRocket",
        mission: "FirstMission",
    },
  });

  if (firstLaunch) console.log("launch data already loaded");
  else await populateLaunches();
}

export async function existsLaunchWithId(id: string) {
    try {
        return await prisma.launch.findUnique({ 
            where: { launchId: id },
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getAllScheduledLaunches() {
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

export async function scheduleLaunch(launch: Launch | any) {
    try {
        const targetPlanet = await prisma.planet.findUnique({
            where: { keplerName: launch.target },
        });
        if (!targetPlanet) throw new Error("No matching planet found!"); 
        await prisma.launch.create({ 
            data: {
                destinationName: launch.target,
                mission: launch.mission,
                rocket: launch.rocket,
                launchDate: Date.now().toString(),
                customers: ["NASA"],
                upcoming: true,
                success: true
            }
        });
        console.log(`Launch ${launch.mission} is scheduled!`);
    } catch (err) {
        console.log(err);
    }
}

export async function abortLaunchById(id: string) {
    try {
        const scheduledLaunchesBefore = await getAllScheduledLaunches();
        console.log(`There are ${scheduledLaunchesBefore.length} scheduled launches.`);
        await prisma.launch.update({
            where: { launchId: id },
            data: { upcoming: false, success: false },
        });
        console.log(`Launch ${id} has been aborted.`);
        const scheduledLaunches = await getAllScheduledLaunches();
        console.log(`The updated number of scheduled launches is ${scheduledLaunches.length}.`);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}