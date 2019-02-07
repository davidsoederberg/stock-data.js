const moment = require('moment');

const VISIT = 'Visit https://www.worldtradingdata.com/ for more information';
const DATE_ERROR = 'must be in the valid format YYYY-MM-DD.';

function validDate(date) {
  return moment(date, 'YYYY-MM-DD', true).isValid();
}

function checkCorrectOptions(options) {
  const {
    date_from, date_to, sort, formatted, date,
    search_by, limit, sort_by, sort_order, interval, range
  } = options;
  if (date_from !== undefined && !validDate(date_from)) {
    throw new Error(`date_from ${DATE_ERROR} ${VISIT}`);
  }
  if (date_to !== undefined && !validDate(date_to)) {
    throw new Error(`date_to ${DATE_ERROR} ${VISIT}`);
  }
  if (sort !== undefined && ['newest', 'oldest', 'desc', 'asc'].indexOf(sort) === -1) {
    throw new Error(`sort has not any of the valid options. Use newest, oldest, desc, asc. ${VISIT}`);
  }
  if (formatted !== undefined && typeof formatted !== 'boolean') {
    throw new Error(`formatted should be a boolean. ${VISIT}`);
  }
  if (date !== undefined && !validDate(date)) {
    throw new Error(`date ${DATE_ERROR} ${VISIT}`);
  }
  if (search_by !== undefined && ['symbol,name', 'symbol', 'name'].indexOf(search_by) === -1) {
    throw new Error(`search_by has not any of the valid options. Use [symbol,name], name, symbol ${VISIT}`);
  }
  if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 500)) {
    throw new Error(`limit value should be between 1-500 ${VISIT}`);
  }
  if (sort_by !== undefined && ['symbol', 'name', 'currency', 'stock_exchange_long', 'stock_exchange_short', 'market_cap', 'volume', 'change_pct'].indexOf(sort_by) === -1) {
    throw new Error(`sort_by has not any of the valid options. ${VISIT}`);
  }
  if (sort_order !== undefined && ['desc', 'asc'].indexOf(sort_order) === -1) {
    throw new Error(`sort_order has not any of the valid options. Use desc, asc. ${VISIT}`);
  }
  if (interval !== undefined && [1, 2, 5, 60].indexOf(Number(interval)) === -1) {
    throw new Error(`interval has not any of the valid options. Use 1, 2, 5, 60. ${VISIT}`);
  }
  if (range !== undefined && (Number(range) < 1 || Number(range) > 30)) {
    throw new Error(`range value should be between 1-30 ${VISIT}`);
  }
}

function formatOptions(options) {
  let query = '&';
  if (options === undefined) {
    return query;
  }
  try {
    checkCorrectOptions(options);
  } catch (error) {
    throw error;
  }
  const {
    date_from, date_to, sort, formatted, date, interval, range,
    search_by, stock_exchange, currency, limit, page, sort_by, sort_order
  } = options;
  query += date_from !== undefined ? `date_from=${date_from}&` : '';
  query += date_to !== undefined ? `date_to=${date_to}&` : '';
  query += sort !== undefined ? `sort=${sort}&` : '';
  query += formatted !== undefined ? `formatted=${formatted}&` : '';
  query += search_by !== undefined ? `search_by=${search_by}&` : '';
  query += stock_exchange !== undefined ? `stock_exchange=${stock_exchange}&` : '';
  query += currency !== undefined ? `currency=${currency}&` : '';
  query += limit !== undefined ? `limit=${limit}&` : '';
  query += sort_by !== undefined ? `sort_by=${sort_by}&` : '';
  query += sort_order !== undefined ? `sort_order=${sort_order}&` : '';
  query += date !== undefined ? `date=${date}&` : '';
  query += page !== undefined ? `page=${page}&` : '';
  query += interval !== undefined ? `interval=${interval}&` : '';
  query += range !== undefined ? `range=${range}&` : '';
  return query;
}

module.exports = formatOptions;
