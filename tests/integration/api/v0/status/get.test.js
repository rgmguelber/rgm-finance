test("GET to api/v0/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v0/status");

  // Verifica sucesso da requisição
  expect(response.status).toBe(200);

  // Verifica sucesso do retorno do update_at
  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedDate = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedDate);

  // Verifica sucesso do retorno da versão do banco de dados
  expect(responseBody.database.server_version).toMatch(/^(\d+\.\d+)/, "16.14");

  // verifica sucesso do retorno da quantidade máxima de conexões
  expect(responseBody.database.max_connections).toEqual(100);

  // Verifica sucesso do retorno do número de conexões abertas
  expect(responseBody.database.opened_connections).toEqual(1);

  console.log(responseBody);
});
