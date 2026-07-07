'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat.at(-1));
  const fromDate = {};

  for (let i = 0; i < dateArray.length; i++) {
    const keyDate = fromFormat[i];
    const valueDate = dateArray[i];

    if (keyDate === 'DD') {
      fromDate['DD'] = valueDate;
    }

    if (keyDate === 'MM') {
      fromDate['MM'] = valueDate;
    }

    if (keyDate === 'YYYY') {
      fromDate['year'] = valueDate;
    }

    if (keyDate === 'YY') {
      const shortYear = Number(valueDate);
      const century = shortYear < 30 ? '20' : '19';

      fromDate['year'] = century + valueDate;
    }
  }

  const arr = [];

  for (let i = 0; i < dateArray.length; i++) {
    if (toFormat[i] === 'YYYY') {
      arr[i] = fromDate['year'];
    }

    if (toFormat[i] === 'YY') {
      arr[i] = fromDate['year'].slice(-2);
    }

    if (toFormat[i] === 'MM') {
      arr[i] = fromDate['MM'];
    }

    if (toFormat[i] === 'DD') {
      arr[i] = fromDate['DD'];
    }
  }

  const result = arr.join(toFormat.at(-1));

  return result;
}

module.exports = formatDate;
