'use strict';

function formatDate(date, fromFormat, toFormat) {
  const ARRAY_DATE = date.split(fromFormat[fromFormat.length - 1]);
  const NEW_SEPARATOR = toFormat[toFormat.length - 1];
  const NEW_FORMAT_DATE = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < ARRAY_DATE.length; i++) {
    if (fromFormat[i].includes('D')) {
      day = ARRAY_DATE[i];
    }

    if (fromFormat[i].includes('M')) {
      month = ARRAY_DATE[i];
    }

    if (fromFormat[i].includes('Y')) {
      year = ARRAY_DATE[i];
    }
  }

  for (let i = 0; i < ARRAY_DATE.length; i++) {
    if (toFormat[i].includes('D')) {
      NEW_FORMAT_DATE[i] = day;
    }

    if (toFormat[i].includes('M')) {
      NEW_FORMAT_DATE[i] = month;
    }

    if (toFormat[i] === 'YY') {
      NEW_FORMAT_DATE[i] = year.slice(-2);
    }

    if (toFormat[i] === 'YYYY' && +year < 100) {
      if (+year < 30) {
        year = `20${year}`;
      } else {
        year = `19${year}`;
      }
    }

    if (toFormat[i] === 'YYYY') {
      NEW_FORMAT_DATE[i] = year;
    }
  }

  return NEW_FORMAT_DATE.join(NEW_SEPARATOR);
}

module.exports = formatDate;
