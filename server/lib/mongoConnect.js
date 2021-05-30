const mongoose = require('mongoose');
require('dotenv').config();

const {
  MONGO_USER_NAME,
  MONGO_USER_PASS,
  MONGO_HOSTNAME,
  MONGO_DB_NAME
} = process.env;

mongoose.connect(
  `mongodb+srv://${MONGO_USER_NAME}:${MONGO_USER_PASS}@${MONGO_HOSTNAME}/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    throw new Error(err);
  });


module.exports = mongoose;
