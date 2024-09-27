'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSign = fromFormat.pop();
  const toSign = toFormat.pop();
  const fromFormatDate = fromFormat.slice(0, 3);
  const toFormatDate = toFormat.slice(0, 3);
  const fromArrayDate = date.split(fromSign);
  const newDate = [];

  if (fromFormatDate.includes('YY') && !toFormatDate.includes('YY')) {
    const indexYear = fromFormatDate.indexOf('YY');

    fromFormatDate.splice(indexYear, 1, 'YYYY');

    if (fromArrayDate[indexYear] < 30) {
      fromArrayDate.splice(indexYear, 1, `20${fromArrayDate[indexYear]}`);
    } else {
      fromArrayDate.splice(indexYear, 1, `19${fromArrayDate[indexYear]}`);
    }
  }

  if (fromFormatDate.includes('YYYY') && !toFormatDate.includes('YYYY')) {
    const indexYear = fromFormatDate.indexOf('YYYY');

    fromFormatDate.splice(indexYear, 1, 'YY');

    const arrYear = fromArrayDate[indexYear].split('');

    fromArrayDate[indexYear] = arrYear.slice(2).join('');
  }

  for (let i = 0; i < toFormatDate.length; i++) {
    const fromIndex = fromFormatDate.indexOf(toFormatDate[i]);

    newDate.push(fromArrayDate[fromIndex]);
  }

  return newDate.join(toSign);
}

module.exports = formatDate;
