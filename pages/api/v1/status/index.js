function status(request,response){
    // response.status(200).send("Olá, eu estou em uma API");
    response.status(200).json({"mensagem" : "Olá, eu estou em uma API, agora em JSON"});
}

export default status;