export default {
  jwt: {
    secret: process.env.APP_SECRET || 'as default',
    expiresIn: '1d'
  }
};
