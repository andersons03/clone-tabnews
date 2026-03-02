import query from "infra/database.js";

beforeAll(cleanDatabase)

async function cleanDatabase(){
	await query("drop schema public cascade; create schema public;")
}

test("Get /api/v1/migrations must be 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  // expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true)
  expect(responseBody.length).toBeGreaterThan(0);

});
