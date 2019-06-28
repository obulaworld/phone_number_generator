import phoneNumberRouter from './PhoneNumberController';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  phoneNumberRouter,
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
