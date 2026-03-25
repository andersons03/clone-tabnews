// import {exec} from "node:child_process"
const {exec} = require("node:child_process");

function checkPostgress(){
  exec('docker exec postgres-dev pg_isready --host localhost', handleReturn)

  function handleReturn(error, stdout){

    if(stdout.search('accepting connections') === -1){
      checkPostgress();
      // console.log("Não está aceitando conexões ainda.");
      process.stdout.write('.');
      return
    }

    console.log("\n \n🟩 Postgres está pronto e aceitando conexões");
    
  }
}

process.stdout.write("\n \n🟥 Aguardando postgres aceitar conexões");

checkPostgress()