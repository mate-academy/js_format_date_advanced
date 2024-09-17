'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[3]);
  const objDate = {
    [fromFormat[0]]: splitDate[0],
    [fromFormat[1]]: splitDate[1],
    [fromFormat[2]]: splitDate[2],
  };
  const returnDate = [];

  if (objDate.YY <= 20) {
    objDate.YYYY = `20${objDate.YY}`;
  } else if (objDate.YY > 20) {
    objDate.YYYY = `19${objDate.YY}`;
  }

  if (objDate.YYYY) {
    objDate.YY = objDate.YYYY.slice(-2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    returnDate.push(objDate[toFormat[i]]);
  }

  return returnDate.join(toFormat[3]);
}

module.exports = formatDate;
