const getRequestParams = (req) => {
  const requestParams = {};
  for (const key in req.query) {
    if (requestParams[key] === undefined) {
      requestParams[key] = req.query[key];
    }
  }
  for (const key in req.params) {
    if (requestParams[key] === undefined) {
      requestParams[key] = req.params[key];
    }
  }
  return requestParams;
};

module.exports = { getRequestParams };

