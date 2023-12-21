'use strict';

function formatDate(date, fromFormat, toFormat) {
  const ARRAY_DATE = date.split(fromFormat[fromFormat.length - 1]);
  const NEW_SEPARATOR = toFormat[toFormat.length - 1];
  const NEW_FORMAT_DATE = [];
  const DAY_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const SHORT_FORMAT_YEAR = 'YY';
  const LONG_FORMAT_YEAR = 'YYYY';

  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < ARRAY_DATE.length; i++) {
    if (fromFormat[i].includes(DAY_FORMAT)) {
      day = ARRAY_DATE[i];
    }

    if (fromFormat[i].includes(MONTH_FORMAT)) {
      month = ARRAY_DATE[i];
    }

    if (fromFormat[i].includes(SHORT_FORMAT_YEAR)) {
      year = ARRAY_DATE[i];
    }
  }

  for (let i = 0; i < ARRAY_DATE.length; i++) {
    if (toFormat[i].includes(DAY_FORMAT)) {
      NEW_FORMAT_DATE[i] = day;
    }

    if (toFormat[i].includes(MONTH_FORMAT)) {
      NEW_FORMAT_DATE[i] = month;
    }

    if (toFormat[i] === SHORT_FORMAT_YEAR) {
      NEW_FORMAT_DATE[i] = year.slice(-2);
    }

    if (toFormat[i] === LONG_FORMAT_YEAR && +year < 100) {
      if (+year < 30) {
        year = `20${year}`;
      } else {
        year = `19${year}`;
      }
    }

    if (toFormat[i] === LONG_FORMAT_YEAR) {
      NEW_FORMAT_DATE[i] = year;
    }
  }

  return NEW_FORMAT_DATE.join(NEW_SEPARATOR);
}

module.exports = formatDate;
