import {
  InternalServerError,
  MethodNotAllowedErrror,
  ValidationError,
  NotFoundError,
} from "infra/errors";

function onNoMatchHandler(req, res) {
  const publicErrorObject = new MethodNotAllowedErrror();
  res.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(err, req, response) {
  if (err instanceof ValidationError || err instanceof NotFoundError) {
    return response.status(err.statusCode).json(err);
  }

  const publicErrorObj = new InternalServerError({
    cause: err,
    statusCode: err.statusCode,
  });

  console.log(publicErrorObj);

  response.status(publicErrorObj.statusCode).json(publicErrorObj);
}

const controller = {
  errorHandlers: {
    onError: onErrorHandler,
    onNoMatch: onNoMatchHandler,
  },
};

export default controller;
