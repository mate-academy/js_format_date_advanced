'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_FROM = fromFormat.pop();
  const SEPARATOR_TO = toFormat.pop();
  const DATE_FROM = date.split(SEPARATOR_FROM);

  const objOfDate = {};

  for (const chunk of DATE_FROM) {
    const key = fromFormat.shift();

    objOfDate[key] = chunk;

    if (key === 'YYYY') {
      objOfDate.YY = objOfDate[key].slice(-2);
    }

    if (key === 'YY') {
      const year = chunk < 30 ? `20${chunk}` : `19${chunk}`;

      objOfDate.YYYY = year;
    }
  }

  const arrOfNewDate = [];

  for (const key of toFormat) {
    if (objOfDate[key]) {
      arrOfNewDate.push(objOfDate[key]);
    }
  }

  const newDAte = arrOfNewDate.join(SEPARATOR_TO);

  return newDAte;
}

module.exports = formatDate;
