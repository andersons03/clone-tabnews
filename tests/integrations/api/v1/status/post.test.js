import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Should return a MethodNotAllowedError when using POST", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowedErrror",
        message: "Método não permitido para este endpoint.",
        action:
          "Verifique se o método HTTP utilizado, é válido para este endpoint.",
        status_code: 405,
      });
    });
  });
});
