const throughError = (errors, value) => {
  errors.forEach((err) => {
    console.log("ERR", err.code);
    switch (err.code) {
      case "string.empty":
        err.message = `${value} should not be empty!"`;
        break;
      case "string.min":
        err.message = `${value} should have at least ${err.local.limit} characters!`;
        break;
      case "string.max":
        err.message = `${value} should have at most ${err.local.limit} characters!`;
        break;
      default:
        break;
    }
  });
  return errors;
};

module.exports = { throughError };
