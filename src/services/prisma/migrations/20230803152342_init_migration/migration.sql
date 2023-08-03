-- CreateTable
CREATE TABLE "Planet" (
    "keplerName" TEXT NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("keplerName")
);

-- CreateTable
CREATE TABLE "Launch" (
    "flightNumber" INTEGER NOT NULL,
    "launchDate" TIMESTAMP(3) NOT NULL,
    "mission" TEXT NOT NULL,
    "rocket" TEXT NOT NULL,
    "customers" TEXT[],
    "upcoming" BOOLEAN NOT NULL,
    "success" BOOLEAN NOT NULL,
    "destinationName" TEXT NOT NULL,

    CONSTRAINT "Launch_pkey" PRIMARY KEY ("flightNumber")
);

-- AddForeignKey
ALTER TABLE "Launch" ADD CONSTRAINT "Launch_destinationName_fkey" FOREIGN KEY ("destinationName") REFERENCES "Planet"("keplerName") ON DELETE RESTRICT ON UPDATE CASCADE;
