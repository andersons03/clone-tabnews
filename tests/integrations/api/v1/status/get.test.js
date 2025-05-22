test("Get status must be 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const updateAt = responseBody.update_at;
  console.log(responseBody);

  expect(response.status).toBe(200);

  expect(responseBody.dependencies.database.version).toBe("16.9");

  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.opened_connections).toBe(1);

  const parseUpdateAt = new Date(updateAt).toISOString();
  expect(updateAt).toEqual(parseUpdateAt);
});
