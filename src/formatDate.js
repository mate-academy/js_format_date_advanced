'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedArray = date.split(fromFormat[fromFormat.length - 1]);
  let year = '';
  const separator = toFormat[toFormat.length - 1];

  toFormat.pop();

  for (const i of toFormat) {
    if (i === 'DD') {
      toFormat[toFormat.indexOf(i)] = splitedArray[fromFormat.indexOf(i)];
    }

    if (i === 'MM') {
      toFormat[toFormat.indexOf(i)] = splitedArray[fromFormat.indexOf(i)];
    }

    if ((i === 'YYYY' || i === 'YY') && fromFormat.includes(i)) {
      year = splitedArray[fromFormat.indexOf(i)];
      toFormat[toFormat.indexOf(i)] = year;
    } else if (i === 'YY') {
      year = splitedArray[fromFormat.indexOf('YYYY')].slice(2);
      toFormat[toFormat.indexOf(i)] = year;
    } else if (i === 'YYYY') {
      if (Number(splitedArray[fromFormat.indexOf('YY')]) < 30) {
        year = '20' + splitedArray[fromFormat.indexOf('YY')];
      } else {
        year = '19' + splitedArray[fromFormat.indexOf('YY')];
      }
      toFormat[toFormat.indexOf(i)] = year;
    }
  }

  return toFormat.join(separator);
}

module.exports = formatDate;
