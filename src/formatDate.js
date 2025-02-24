'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const delimiterFrom = fromFormat[findDelimiter(fromFormat)];
  const delimiterTo = toFormat[findDelimiter(toFormat)];

  const dateArr = date.split(delimiterFrom);

  const getValue = (element) => dateArr[fromFormat.indexOf(element)];
  let year = getValue('YY') || getValue('YYYY');

  if (fromFormat.includes('YY')) {
    year = Number(year) < 30 ? `20${year}` : `19${year}`;
  }

  const result = [];

  result[toFormat.indexOf('DD')] = getValue('DD');
  result[toFormat.indexOf('MM')] = getValue('MM');

  result[toFormat.indexOf(toFormat.includes('YY') ? 'YY' : 'YYYY')] =
    toFormat.includes('YY') ? year.slice(-2) : year;

  return result.join(delimiterTo);
}

const findDelimiter = (dateFormat) => {
  for (let i = 0; i < dateFormat.length; i++) {
    if (!['YY', 'YYYY', 'MM', 'DD'].includes(dateFormat[i])) {
      return i;
    }
  }

  return -1;
};

module.exports = formatDate;
