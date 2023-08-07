import express, {Express} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { loadPlanetsData } from './models/planet.model';
//import { getAllPlanets } from './models/planet.model';
import { loadLaunchData } from './models/launch.model';
import { planetsRouter } from './routes/planets/planet.router';
import { launchesRouter } from './routes/launches/launch.router';
const prisma: PrismaClient = new PrismaClient();

const app: Express = express();
const PORT: Number = Number(process.env.PORT) || 5000;

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

async function main() {
    try {
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        loadPlanetsData();
        // const planets = await getAllPlanets();
        // planets.forEach((planet) => {
        //     console.log(planet.keplerName);
        // });
        loadLaunchData();
    } catch (err) {
        await prisma.$disconnect();
        console.log(err);
    }
}

main();