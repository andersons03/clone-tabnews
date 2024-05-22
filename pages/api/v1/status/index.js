import database from "../../../../infra/database.js";

async function status(request,response){
    // response.status(200).send("Olá, eu estou em uma API");
    // console.log(database());
    const result = await database.query('SELECT 1 + 1 as sum');
    console.log(result.rows);
    response.status(200).json({"mensagem" : "Olá, eu estou em uma API, agora em JSON"});
}

export default status;