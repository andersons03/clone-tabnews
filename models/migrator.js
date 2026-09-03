import database from "infra/database";
import { runner } from "node-pg-migrate";
import { join } from "node:path";

const defaultMigrationOptions = {
  dryRun: true,
  dir: join("infra", "migrations"),
  verbose: true,
  migrationsTable: "pgmigrations",
  direction: "up",
};

async function listPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const pendingMigrations = await runner({
      dbClient,
      ...defaultMigrationOptions
    });

    return pendingMigrations;

  } finally {
    dbClient?.end();
  }
}

async function runPendingMigrations(optons) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const migratedMigrations = await runner({
      dbClient,
      ...defaultMigrationOptions,
      dryRun: false
    });

    return migratedMigrations;

  } finally {
    dbClient?.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations
}

export default migrator;