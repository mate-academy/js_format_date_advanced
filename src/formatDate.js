'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const delimiterFrom = fromFormat[3];
  const dateParts = date.split(delimiterFrom);

  const dateObj = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateObj[part] = dateParts[index];
  });

  if (dateObj['YYYY']) {
    dateObj['YY'] = dateObj['YYYY'].slice(2);
  } else if (dateObj['YY']) {
    const year = parseInt(dateObj['YY']);

    dateObj['YYYY'] = year < 30 ? `20${dateObj['YY']}` : `19${dateObj['YY']}`;
  }

  const delimiterTo = toFormat[3];
  const newDate = toFormat
    .slice(0, 3)
    .map((part) => dateObj[part])
    .join(delimiterTo);

  return newDate;
}

module.exports = formatDate;
