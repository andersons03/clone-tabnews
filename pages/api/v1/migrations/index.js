import { createRouter } from "next-connect";
import controller from "infra/controller";
import { runner } from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

const defaultMigrationOptions = {
  dryRun: true,
  dir: join("infra", "migrations"),
  verbose: true,
  migrationsTable: "pgmigrations",
  direction: "up",
};

async function postHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await runner({
      dbClient,
      ...defaultMigrationOptions,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } finally {
    dbClient?.end();
  }
}

async function getHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const pendingMigrations = await runner({
      dbClient,
      ...defaultMigrationOptions,
    });
    return response.status(200).json(pendingMigrations);
  } finally {
    dbClient?.end();
  }
}
