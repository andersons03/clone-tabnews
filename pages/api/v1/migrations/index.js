import migrationRunner from "node-pg-migrate"
import {join} from "node:path"
import database from "infra/database";

async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join('infra','migrations'),
    verbose: true,
    migrationsTable: 'pgmigrations',
    direction: 'up'
  }

  if (request.method == "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions, 
      dryRun: false
    })

    dbClient.end();

    if(migratedMigrations.length > 0){
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  if (request.method == "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions)

    dbClient.end();
  
    return response.status(200).json(pendingMigrations);
  }

  response.status(405).json([])
}

export default migrations;
