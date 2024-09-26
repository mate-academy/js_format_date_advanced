'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const splitedDate = date.split(separator);
  const newDate = [];
  const yearShort = splitedDate[fromFormat.indexOf('YY')];
  const yearLong = splitedDate[fromFormat.indexOf('YYYY')];
  const month = splitedDate[fromFormat.indexOf('MM')];
  const day = splitedDate[fromFormat.indexOf('DD')];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newDate.push(day);
    } else if (toFormat[i] === 'MM') {
      newDate.push(month);
    } else if (toFormat[i] === 'YYYY' && fromFormat.includes('YYYY')) {
      newDate.push(yearLong);
    } else if (toFormat[i] === 'YYYY' && yearShort < 30) {
      newDate.push(`20${yearShort}`);
    } else if (toFormat[i] === 'YYYY' && yearShort >= 30) {
      newDate.push(`19${yearShort}`);
    } else if (toFormat[i] === 'YY' && fromFormat.includes('YY')) {
      newDate.push(yearShort);
    } else {
      newDate.push(yearLong.slice(-2));
    }
  }

  return (newDate.join(newSeparator));
}
module.exports = formatDate;
