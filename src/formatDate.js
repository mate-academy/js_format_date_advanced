'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const CENTURY_EDGE = 30;
  const XXI_CENTURY = 20;
  const XX_CENTURY = 19;
  const SHORT_YEAR_FORM = 'YY';
  const LONG_YEAR_FORM = 'YYYY';

  const dateParts = date.split(fromFormat[3]);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = dateParts[i];
  }

  if (dateObj[SHORT_YEAR_FORM] && !dateObj[LONG_YEAR_FORM]) {
    const yy = dateObj[SHORT_YEAR_FORM];

    dateObj[LONG_YEAR_FORM] = yy < CENTURY_EDGE ? `${XXI_CENTURY}${yy}` : `${XX_CENTURY}${yy}`;
  }

  if (dateObj[LONG_YEAR_FORM] && !dateObj[SHORT_YEAR_FORM]) {
    dateObj[SHORT_YEAR_FORM] = dateObj[LONG_YEAR_FORM].slice(-2);
  }

  const formattedDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    formattedDateParts.push(dateObj[toFormat[i]]);
  }

  return formattedDateParts.join(toFormat[3]);
}

module.exports = formatDate;
