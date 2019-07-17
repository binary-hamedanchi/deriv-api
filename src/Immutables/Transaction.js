import CustomDate  from '../Types/CustomDate';
import FullName    from '../Types/FullName';
import Immutable   from '../Types/Immutable';
import MarketValue from '../Types/MarketValue';
import Monetary    from '../Types/Monetary';

/**
 * @typeof {Object} TransactionParams
 */

/**
 * A class for transaction objects
 *
 * @param {Object} transaction
 * @param {String} transaction.action
 * @param {String} transaction.currency
 * @param {Number} transaction.amount
 * @param {Number} transaction.balance
 * @param {String|Number} transaction.high_barrier
 * @param {String|Number} transaction.low_barrier
 * @param {String|Number} transaction.barrier
 * @param {String} transaction.longcode
 * @param {String} transaction.symbol
 * @param {String} transaction.display_name - Belongs to symbol
 * @param {Number} transaction.transaction_id
 * @param {Number} transaction.contract_id
 * @param {Number} transaction.purchase_time
 * @param {Number} transaction.date_expiry
 * @param {Number} transaction.transaction_time
 * @param {Number} pip
 *
 * @property {String} action
 * @property {String} longcode
 * @property {Number} id - transaction ID
 * @property {Number} contract_id
 * @property {FullName} symbol
 * @property {Monetary} amount
 * @property {Monetary} balance
 * @property {MarketValue} high_barrier
 * @property {MarketValue} low_barrier
 * @property {MarketValue} barrier
 * @property {CustomDate} purchase_time
 * @property {CustomDate} date_expiry
 * @property {CustomDate} time
 * @property {Object} raw - The raw data received from API
 */
export default class Transaction extends Immutable {
    constructor(transaction, pip) {
        const {
            action,
            currency,
            amount,
            balance,
            high_barrier,
            low_barrier,
            barrier,
            longcode,
            symbol,
            display_name,
            transaction_id,
            contract_id,
            purchase_time,
            date_expiry,
            transaction_time,
        } = transaction;

        const instance = { raw: transaction };

        instance.action      = action;
        instance.longcode    = longcode;
        instance.id          = transaction_id;
        instance.contract_id = contract_id;

        instance.symbol = new FullName(symbol, display_name);

        instance.amount  = new Monetary(amount, currency);
        instance.balance = new Monetary(balance, currency);

        if (high_barrier) instance.high_barrier = new MarketValue(high_barrier, pip);
        if (low_barrier) instance.low_barrier = new MarketValue(low_barrier, pip);
        if (barrier) instance.barrier = new MarketValue(barrier, pip);

        instance.purchase_time = new CustomDate(purchase_time);
        instance.date_expiry   = new CustomDate(date_expiry);
        instance.time          = new CustomDate(transaction_time);

        super(instance);
    }
}
