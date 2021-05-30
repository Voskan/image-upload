const createError = require('http-errors');

/**
 * function - create and response errors
 *
 * return json
 */
module.exports = async (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use(async (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message || err.msg;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.json({
      info: {
        error: true
      },
      error: res.locals.message
    });
  });

};
