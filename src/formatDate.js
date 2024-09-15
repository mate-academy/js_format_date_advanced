'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedDate = date.split(fromFormat[3]);
  const oldDateFormat = {
    [fromFormat[0]]: splitedDate[0],
    [fromFormat[1]]: splitedDate[1],
    [fromFormat[2]]: splitedDate[2],
  };

  const newDateFormat = [];

  for (const type of toFormat.slice(0, 3)) {
    if (oldDateFormat.hasOwnProperty(type)) {
      newDateFormat.push(oldDateFormat[type]);
      continue;
    }

    if (type === 'YYYY') {
      // eslint-disable-next-line
      newDateFormat.push(oldDateFormat.YY < 30 ? `20${oldDateFormat.YY}` : `19${oldDateFormat.YY}`);
    } else {
      newDateFormat.push(oldDateFormat.YYYY.slice(-2));
    }
  }

  return newDateFormat.join(toFormat[3]);
}

module.exports = formatDate;
