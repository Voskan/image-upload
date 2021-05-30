const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const zlib = require('zlib');
const requestIp = require('request-ip');
const logger = require('morgan');
const cors = require('cors');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const conf = require('./config');
const imageRoutes = require('./routes/image');

const app = express();
const originsWhitelist = [conf.MAIN.CLIENT_URL];

const corsOptions = {
  origin(origin, callback) {
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(requestIp.mw());

app.use(compression({ level: zlib.GZIP }));
app.use(logger(conf.MAIN.LOG_LEVEL));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/image', imageRoutes);

require('./middlewares/error')(app);

module.exports = app;
