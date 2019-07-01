import express from 'express';
import PhoneNumberController from './PhoneNumberController';
import QueryValidator from '../../middlewares/checkQuery';

const phoneNumberRouter = express.Router();

phoneNumberRouter.get(
  '/',
  PhoneNumberController.home,
);

phoneNumberRouter.get('/numbers',
    QueryValidator.checkQuery,
    PhoneNumberController.getPhoneNumbers
);

phoneNumberRouter.get('/numbers/generate',
    QueryValidator.checkQuery,
    PhoneNumberController.generatePhoneNumbers
);

phoneNumberRouter.get('/numbers/minmax',
    PhoneNumberController.getMinMaxPhoneNumbers
);

export default phoneNumberRouter;
