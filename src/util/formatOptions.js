const moment = require('moment');

const VISIT = 'Visit https://www.worldtradingdata.com/ for more information';
const DATE_ERROR = 'must be in the valid format YYYY-MM-DD.';

function validDate(date) {
  return moment(date, 'YYYY-MM-DD', true).isValid();
}

function checkCorrectOptions(options) {
  const {
    date_from, date_to, sort, formatted, date
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
    date_from, date_to, sort, formatted, date
  } = options;
  query += date_from !== undefined ? `date_from=${date_from}&` : '';
  query += date_to !== undefined ? `date_to=${date_to}&` : '';
  query += sort !== undefined ? `sort=${sort}&` : '';
  query += formatted !== undefined ? `formatted=${formatted}&` : '';
  query += date !== undefined ? `date=${date}&` : '';
  return query;
}

module.exports = formatOptions;
