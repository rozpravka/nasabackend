import fs from 'fs';
import { parse } from 'csv-parse';
import { Planet, PrismaClient } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();

function isHabitable(planet: any) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

export function loadPlanetsData() {
    try {
        fs.createReadStream('src/data/kepler_data.csv')
            .pipe(parse({comment: '#', columns: true}))
            .on('data', async (data) => {
                try {
                    if (isHabitable(data)) await savePlanet(data);
                } catch (err) {
                    console.log(`Could not save planet ${data.kepler_name}`);
                }
            })
            .on('end', () => {
                console.log("done!");
            });
    } catch (err) {
        console.log(err);
    }
}

export async function getAllPlanets() {
    const planets: Planet[] = await prisma.planet.findMany();
    return planets;
}

async function savePlanet(planetData: any) {
    try {
        await prisma.planet.create({
            data: {
                keplerName: planetData.kepler_name,
            },
        });
    } catch (err) {
        //console.log(err);
        console.log(`Could not save planet ${planetData.kepler_name}`);
    }
}