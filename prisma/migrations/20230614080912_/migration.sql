/*
  Warnings:

  - You are about to drop the column `type` on the `DataRow` table. All the data in the column will be lost.
  - Added the required column `field` to the `DataRow` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DataRow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "details" TEXT,
    "dataTypeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DataRow_dataTypeId_fkey" FOREIGN KEY ("dataTypeId") REFERENCES "DataType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DataRow" ("createdAt", "dataTypeId", "details", "id", "name", "updatedAt") SELECT "createdAt", "dataTypeId", "details", "id", "name", "updatedAt" FROM "DataRow";
DROP TABLE "DataRow";
ALTER TABLE "new_DataRow" RENAME TO "DataRow";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
