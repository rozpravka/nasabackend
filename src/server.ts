import express, {Express} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { getAllPlanets, loadPlanetsData } from './models/planets.model';
const prisma: PrismaClient = new PrismaClient();

const app: Express = express();
const PORT: Number = Number(process.env.PORT) || 5000;

app.use(express.json());

async function main() {
    try {
        await prisma.$connect();
        loadPlanetsData();
        const planets = await getAllPlanets();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        planets.forEach((planet) => {
            console.log(planet.keplerName);
        });
    } catch (err) {
        await prisma.$disconnect();
        console.log(err);
    }
}

main();