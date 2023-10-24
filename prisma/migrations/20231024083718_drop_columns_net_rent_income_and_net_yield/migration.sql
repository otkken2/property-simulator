/*
  Warnings:

  - You are about to drop the column `net_rent_income` on the `SimulationResult` table. All the data in the column will be lost.
  - You are about to drop the column `net_yield` on the `SimulationResult` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SimulationResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "propertyPrice" INTEGER NOT NULL,
    "property_tax_value" DECIMAL NOT NULL,
    "monthly_rent_income" DECIMAL NOT NULL,
    "montthly_management_fee" DECIMAL NOT NULL,
    "annual_property_tax" DECIMAL NOT NULL,
    "urban_planninng_tax" DECIMAL NOT NULL,
    "updated_at" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SimulationResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SimulationResult" ("annual_property_tax", "createdAt", "id", "monthly_rent_income", "montthly_management_fee", "name", "propertyPrice", "property_tax_value", "updated_at", "urban_planninng_tax", "user_id") SELECT "annual_property_tax", "createdAt", "id", "monthly_rent_income", "montthly_management_fee", "name", "propertyPrice", "property_tax_value", "updated_at", "urban_planninng_tax", "user_id" FROM "SimulationResult";
DROP TABLE "SimulationResult";
ALTER TABLE "new_SimulationResult" RENAME TO "SimulationResult";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
