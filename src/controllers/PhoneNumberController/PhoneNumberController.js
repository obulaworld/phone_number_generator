import fs from 'fs';
import CustomError from '../../helpers/Error';
import generateNumber from '../../helpers/generator';
import {
  MAX_LENGTH,
  MIN_LENGTH,
  FILE_NAME,
  FILE_PATH
} from '../../helpers/defaults';

/**
 * Handles operations on contact routes
 *
 * @exports
 * @class ContactController
 */
export default class PhoneNumberGeneratorController {
   /**
     * The home route
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {String} response string
     * @memberof PhoneNumberGeneratorController     *
     */
  static home(req, res) {
    res.status(200).send('Welcome to Phone Number Generator Application API');
  }

     /**
     * The generate method
     *
     * @static
     * @param  {object} quantity - quantity integer
     * @param  {object} order - order string
     * @returns {object}  object
     * @memberof PhoneNumberGeneratorController     *
     */
  static async generate(quantity) {
    try {
        const generatedPhoneNumbers = [];

        while (generatedPhoneNumbers.length < quantity) {
            const number = generateNumber(MIN_LENGTH, MAX_LENGTH);
            if (!generatedPhoneNumbers.includes(number)) {
               generatedPhoneNumbers.push(number);
            }
        }

        return generatedPhoneNumbers;

      } catch (error) {
          CustomError.handleError(error, 500, res);
      }
  }


  /**
     * The generatePhoneNumbers route
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof PhoneNumberGeneratorController     *
     */
    static async generatePhoneNumbers(req, res) {
      try {
        const { quantity, order } = req.query;
        const newQuantity = parseInt(quantity, 10);


        const generatedPhoneNumbers = await PhoneNumberGeneratorController.generate(newQuantity);

        if(order == 'ascending'){
          generatedPhoneNumbers.sort();
        } else {
          generatedPhoneNumbers.sort().reverse();
        }
        console.log(generatedPhoneNumbers);

        if (!fs.existsSync(FILE_PATH)){
            fs.mkdirSync(FILE_PATH);
        }

        fs.writeFile(FILE_NAME,generatedPhoneNumbers.toString(), error => console.log(error));

        return res.status(201).json({
          success: true,
          message: 'Phone numbers generated successfully',
          phoneNumbers: generatedPhoneNumbers
        });

      } catch (error) {
        console.log(error);
        CustomError.handleError(error, 500, res);
      }
    }

    static async getPhoneNumbers(req, res) {
      try {
          const { quantity, order } = req.query;
          if (!fs.existsSync(FILE_PATH)) {
            return res.status(404).json({
              success: true,
              message: 'No phone numbers generated',
              totalGeneratedPhoneNumbers: 0
            });
          }
          const generatedPhoneNumbers = fs.readFileSync(FILE_NAME).toString();
          let generatedPhoneNumbersList;
          let totalGeneratedPhoneNumbers;

          if(!generatedPhoneNumbers.replace(/\s/g, '').length){
            generatedPhoneNumbersList = [];
            totalGeneratedPhoneNumbers = 0;
          } else{
            generatedPhoneNumbersList = await generatedPhoneNumbers.split(',');
            totalGeneratedPhoneNumbers = generatedPhoneNumbersList.length;
          }

          if (quantity) {
            generatedPhoneNumbersList.splice(quantity);
          }

          if(order == 'ascending'){
            generatedPhoneNumbersList.sort();
          } else {
            generatedPhoneNumbersList.sort().reverse();
          }

          return res.status(200).json({
              success: true,
              message: 'Retrieved phone numbers successfully',
              generatedPhoneNumbersList,
              totalGeneratedPhoneNumbers
          });
      } catch (error) {
        CustomError.handleError(error, 500, res);
      }
  }

  static async getMinMaxPhoneNumbers(req, res) {
    try {
      const generatedPhoneNumbers = fs.readFileSync(FILE_NAME).toString();

      let generatedPhoneNumbersList;

      if(!generatedPhoneNumbers.replace(/\s/g, '').length){
        CustomError.handleError('No phone numbers generated yet', 404, res);
      } else{
        generatedPhoneNumbersList = await generatedPhoneNumbers.split(',');
      }

        const MIN_PHONE_NUMBER = `0${Math.min(...generatedPhoneNumbersList)}`;
        const MAX_PHONE_NUMBER = `0${Math.max(...generatedPhoneNumbersList)}`;

        return res.status(200).json({
            success: true,
            message: 'Min and Max Phone numbers retrieved sucessfully',
            minimum_phone_number: MIN_PHONE_NUMBER,
            maximum_phone_number: MAX_PHONE_NUMBER
        });
    } catch (error) {
      CustomError.handleError(error, 500, res);
    }
}

}