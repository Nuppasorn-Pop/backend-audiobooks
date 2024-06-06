const createError = (details) => {
  const error = new Error(details.message);
  error.status = details.status;
  error.field = details.field;
  // throw error;
  console.log(error);
};

module.exports = createError;
