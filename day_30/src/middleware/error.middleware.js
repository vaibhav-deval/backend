import dotenv from "dotenv";
dotenv.config();
function handleError(err, req, res, next) {
  const respond = {
    message: err.message,
  };
  if (process.env.NODE_ENVIROMENT == "development") {
    respond.stack = err.stack;
  }
  res.status(err.status).json(respond);
}

export default handleError;
