/*
  Warnings:

  - You are about to drop the column `createdAt` on the `SimulationResult` table. All the data in the column will be lost.
  - You are about to drop the column `montthly_management_fee` on the `SimulationResult` table. All the data in the column will be lost.
  - You are about to drop the column `propertyPrice` on the `SimulationResult` table. All the data in the column will be lost.
  - You are about to drop the column `urban_planninng_tax` on the `SimulationResult` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `monthly_management_fee` to the `SimulationResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_price` to the `SimulationResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urban_planning_tax` to the `SimulationResult` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SimulationResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "property_price" INTEGER NOT NULL,
    "property_tax_value" DECIMAL NOT NULL,
    "monthly_rent_income" DECIMAL NOT NULL,
    "monthly_management_fee" DECIMAL NOT NULL,
    "annual_property_tax" DECIMAL NOT NULL,
    "urban_planning_tax" DECIMAL NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SimulationResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SimulationResult" ("annual_property_tax", "id", "monthly_rent_income", "name", "property_tax_value", "updated_at", "user_id") SELECT "annual_property_tax", "id", "monthly_rent_income", "name", "property_tax_value", "updated_at", "user_id" FROM "SimulationResult";
DROP TABLE "SimulationResult";
ALTER TABLE "new_SimulationResult" RENAME TO "SimulationResult";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
