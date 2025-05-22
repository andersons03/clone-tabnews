import query from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const dbVersionResult = await query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;
  const dbMaxConnectionResult = await query("SHOW max_connections;");
  const dbMaxConnectionValue = dbMaxConnectionResult.rows[0].max_connections;

  const dbOpenedConnectionsquery = {
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [process.env.POSTGRES_DB],
  };
  const dbOpenedConnectionsResult = await query(dbOpenedConnectionsquery);
  const dbOpenedConnectionsValue = dbOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        max_connections: parseInt(dbMaxConnectionValue),
        opened_connections: dbOpenedConnectionsValue,
        version: dbVersionValue,
      },
    },
  });
}

export default status;
