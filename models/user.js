import database from "infra/database.js";
import { ValidationError } from "infra/errors";

async function create(userInputValue){
  await validateUniqueEmail(userInputValue.email)
  await validateUniqueUsername(userInputValue.username)

  const newUser  = await runInsertQuery(userInputValue);
  return newUser;
  
  async function runInsertQuery(userInputValue){
    const {username, email, password} = userInputValue;

    const reulsts = await database.query({
      text: `
        INSERT INTO 
          users (username, email, password) 
        VALUES 
          ($1, $2, $3)
        RETURNING
          *
      ;`,
      values: [username, email, password]
    });
    return reulsts.rows[0]
  }

  async function validateUniqueEmail(email){
    const results = await database.query({
      text: `
        SELECT 
          email
        FROM
          users
        WHERE
         LOWER(email) = LOWER($1)
      ;`,
      values: [email]
    });

    if(results.rowCount > 0){
      throw new ValidationError({
        message: "O email informado já está sendo utilizado",
        action: "Utilize outro email para realizar o cadastro."
      })
    }
  }

  async function validateUniqueUsername(username){
    const results = await database.query({
      text: `
        SELECT 
          username
        FROM
          users
        WHERE
         LOWER(username) = LOWER($1)
      ;`,
      values: [username]
    });

    if(results.rowCount > 0){
      throw new ValidationError({
        message: "O username informado já está sendo utilizado",
        action: "Utilize outro username para realizar o cadastro."
      })
    }
  }
}

const user = {
  create
}

export default user;
