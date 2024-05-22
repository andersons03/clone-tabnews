import {Client} from 'pg';

async function query(queryObj){
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        database: 'postgres',
        password: 'senhaSegura'
    });
    await client.connect();
    const result = await client.query(queryObj);
    await client.end();

    return result;
}

export default {
    query:query,
};