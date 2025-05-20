import query from "../../../../infra/database";

async function status(request, response) {
  const result = await query("SELECT 1 + 1 AS Soma");
  console.log(result.rows);
  response.status(200).json({ message: "não sei o que escrever" });
}

export default status;
