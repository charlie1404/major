const path = require('path');

const {
  PUBLIC_KEY,
  PRIVATE_KEY,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const authId = () => ({
  httpOnly: true,
  expires: new Date(Date.now() + 7200000),
});
const keepAlive = () => ({
  expires: new Date(Date.now() + 7200000),
});

const ENV_CONFIG = {
  production: {
    mongodbConfig: {
      poolSize: 10,
      useNewUrlParser: true,
    },
    authIdParams: () => Object.assign({}, authId(), { secure: true }),
    keepAliveParams: () => Object.assign({}, keepAlive(), { secure: true }),
  },
  development: {
    mongodbConfig: {
      useCreateIndex: true,
      poolSize: 2,
      useNewUrlParser: true,
    },
    authIdParams: authId,
    keepAliveParams: keepAlive,
  },
};

const COMMON_CONFIG = {
  LOGS_PATH: path.join(__dirname, '..', 'logs'),
  jwtPublicKey: Buffer.from(PUBLIC_KEY),
  jwtPrivateKey: Buffer.from(PRIVATE_KEY),
  jwtSecret: Buffer.from(JWT_SECRET),
  jwtConfig: {
    algorithm: 'HS256',
    expiresIn: 3600,
  },
  corsOptions: {
    origin: true,
    // origin: (origin, callback) => {
    //   if (!origin || ['http://localhost:4000', 'http://charlieweb.tk'].indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    maxAge: 600,
  },
};

let env = NODE_ENV || '';
if (!ENV_CONFIG[env]) {
  env = 'development';
}

module.exports = Object.assign({}, COMMON_CONFIG, ENV_CONFIG[env]);
