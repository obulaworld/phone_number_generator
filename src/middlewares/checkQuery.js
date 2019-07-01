import CustomError from '../helpers/Error';
import { ORDER, MAX_NUMBERS } from '../helpers/defaults';

export default class QueryValidator {

  static checkQuery(req, res, next) {
    const { quantity, order } = req.query;
    if (!quantity || !quantity.replace(/\s/g, '').length || isNaN(quantity) || quantity > MAX_NUMBERS) {
      CustomError.handleError(`Quantity must be a number and not greater than ${MAX_NUMBERS}`, 400, res);
    }
    else if (!order || !order.replace(/\s/g, '').length || !ORDER.includes(order.toLowerCase())) {
      CustomError.handleError('Order must be either ascending or descending', 400, res);
    }
    else{
      next();
    }
  }

}
