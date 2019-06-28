import CustomError from '../../helpers/Error';

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

}