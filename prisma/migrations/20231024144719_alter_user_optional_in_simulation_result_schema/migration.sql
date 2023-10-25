-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SimulationResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "name" TEXT NOT NULL,
    "property_price" INTEGER NOT NULL,
    "property_tax_value" DECIMAL NOT NULL,
    "monthly_rent_income" DECIMAL NOT NULL,
    "monthly_management_fee" DECIMAL NOT NULL,
    "annual_property_tax" DECIMAL NOT NULL,
    "urban_planning_tax" DECIMAL NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SimulationResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SimulationResult" ("annual_property_tax", "created_at", "id", "monthly_management_fee", "monthly_rent_income", "name", "property_price", "property_tax_value", "updated_at", "urban_planning_tax", "user_id") SELECT "annual_property_tax", "created_at", "id", "monthly_management_fee", "monthly_rent_income", "name", "property_price", "property_tax_value", "updated_at", "urban_planning_tax", "user_id" FROM "SimulationResult";
DROP TABLE "SimulationResult";
ALTER TABLE "new_SimulationResult" RENAME TO "SimulationResult";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
