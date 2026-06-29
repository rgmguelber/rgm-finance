import database from "@/infra/database";

export async function GET(request: Request, response: Response) {
  // Data da atualização
  const updateAt = new Date().toISOString();

  // Versão do banco de dados
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  // Máximo de conexões
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnections =
    databaseMaxConnectionsResult.rows[0].max_connections;

  // Conexões ativas
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(datid) as opened_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });
  const databaseOpenedConnections =
    databaseOpenedConnectionsResult.rows[0].opened_connections;

  return Response.json({
    update_at: updateAt,
    database: {
      server_version: databaseVersion,
      max_connections: parseInt(databaseMaxConnections),
      opened_connections: parseInt(databaseOpenedConnections),
    },
  });
}

// TODO: Aula Dia 20 - Endpoint "/status": ISO 8601 + Fuso
