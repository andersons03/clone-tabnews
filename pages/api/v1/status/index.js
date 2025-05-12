function status(request, response) {
  console.log(response);
  response.status(200).json({ message: "não sei o que escrever" });
}

export default status;
