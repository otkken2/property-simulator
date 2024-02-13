/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `user_id` on the `SimulationResult` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `SimulationResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SimulationResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "property_price" INTEGER NOT NULL,
    "property_tax_value" DECIMAL NOT NULL,
    "monthly_rent_income" DECIMAL NOT NULL,
    "monthly_management_fee" DECIMAL NOT NULL,
    "annual_property_tax" DECIMAL NOT NULL,
    "urban_planning_tax" DECIMAL NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SimulationResult" ("annual_property_tax", "created_at", "id", "monthly_management_fee", "monthly_rent_income", "name", "property_price", "property_tax_value", "updated_at", "urban_planning_tax") SELECT "annual_property_tax", "created_at", "id", "monthly_management_fee", "monthly_rent_income", "name", "property_price", "property_tax_value", "updated_at", "urban_planning_tax" FROM "SimulationResult";
DROP TABLE "SimulationResult";
ALTER TABLE "new_SimulationResult" RENAME TO "SimulationResult";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
