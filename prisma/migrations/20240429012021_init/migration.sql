-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL
);
