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
    "net_rent_income" DECIMAL NOT NULL,
    "net_yield" DECIMAL NOT NULL,
    "updated_at" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SimulationResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SimulationResult" ("annual_property_tax", "createdAt", "id", "monthly_rent_income", "montthly_management_fee", "name", "net_rent_income", "net_yield", "propertyPrice", "property_tax_value", "updated_at", "urban_planninng_tax", "user_id") SELECT "annual_property_tax", "createdAt", "id", "monthly_rent_income", "montthly_management_fee", "name", "net_rent_income", "net_yield", "propertyPrice", "property_tax_value", "updated_at", "urban_planninng_tax", "user_id" FROM "SimulationResult";
DROP TABLE "SimulationResult";
ALTER TABLE "new_SimulationResult" RENAME TO "SimulationResult";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
