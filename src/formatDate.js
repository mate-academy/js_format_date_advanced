'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_FROM_FORMAT = fromFormat[3];
  const SEPARATOR_TO_FORMAT = toFormat[3];

  const SHORT_YEAR_FORMAT = 'YY';
  const LONG_YEAR_FORMAT = 'YYYY';

  const MAX_YEAR_NEW_CENTURY = 30;
  const NEW_CENTURY = 20;

  const dateArr = date.split(SEPARATOR_FROM_FORMAT);
  const dateObject = {};
  const formatedDateArr = [];

  for (let i = 0; i < dateArr.length; i++) {
    dateObject[fromFormat[i]] = dateArr[i];
  }

  for (const el of toFormat) {
    if (dateObject[el] !== undefined) {
      formatedDateArr.push(dateObject[el]);
      continue;
    }

    if (el === SHORT_YEAR_FORMAT && dateObject[LONG_YEAR_FORMAT]) {
      formatedDateArr.push(dateObject[LONG_YEAR_FORMAT].slice(2));
      continue;
    }

    if (el === LONG_YEAR_FORMAT && dateObject[SHORT_YEAR_FORMAT]) {
      const year = dateObject[SHORT_YEAR_FORMAT];

      if (+year < MAX_YEAR_NEW_CENTURY) {
        formatedDateArr.push(NEW_CENTURY.toString().concat(year));
        continue;
      }
      formatedDateArr.push((NEW_CENTURY - 1).toString().concat(year));
    }
  }

  return formatedDateArr.join(SEPARATOR_TO_FORMAT);
}

module.exports = formatDate;
