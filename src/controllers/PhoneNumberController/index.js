import express from 'express';
import PhoneNumberController from './PhoneNumberController';

const phoneNumberRouter = express.Router();

phoneNumberRouter.get(
  '/',
  PhoneNumberController.home,
);

export default phoneNumberRouter;
