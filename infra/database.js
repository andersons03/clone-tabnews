import { Client } from "pg";

async function query(queryObj) {
  const envVar = process.env;

  const client = new Client({
    host: envVar.POSTGRES_HOST,
    port: envVar.POSTGRES_PORT,
    database: envVar.POSTGRES_DB,
    user: envVar.POSTGRES_USER,
    password: envVar.POSTGRES_PASSWORD,
    ssl: (envVar.NODE_ENV === 'production') ? true : false
  });

  try {
    await client.connect();
    const result = await client.query(queryObj);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

export default query;
