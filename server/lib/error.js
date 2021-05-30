const errors = require('../messages');


module.exports = (key, name = '') => {
  const errObj = errors(key);
  errObj.msg = errObj.msg || 'Error';

  let err = '';
  if (name) {
    err = new Error(`${name}: ${errObj.msg}`);
  } else {
    err = new Error(errObj.msg);
  }

  errObj.status = errObj.status || 500;
  err.status = errObj.status;

  return err;
};
