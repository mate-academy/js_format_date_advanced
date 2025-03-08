'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arr = date.split(fromFormat[3]);
  const result = [...arr];
  const indexMMfrom = fromFormat.indexOf('MM');
  const indexMMto = toFormat.indexOf('MM');
  const indexDDfrom = fromFormat.indexOf('DD');
  const indexDDto = toFormat.indexOf('DD');
  const indexYYYYfrom = fromFormat.indexOf('YYYY');
  const indexYYYYto = toFormat.indexOf('YYYY');
  const indexYYfrom = fromFormat.indexOf('YY');
  const indexYYto = toFormat.indexOf('YY');

  if (indexMMfrom !== indexMMto) {
    result[indexMMto] = arr[indexMMfrom];
  }

  if (indexDDfrom !== indexDDto) {
    result[indexDDto] = arr[indexDDfrom];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YYYY')) {
    result[indexYYYYto] = arr[indexYYYYfrom];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YY')) {
    result[indexYYto] = arr[indexYYfrom];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    result[indexYYto] = arr[indexYYYYfrom].slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (+arr[indexYYfrom] < 30) {
      result[indexYYYYto] = `20${arr[indexYYfrom]}`;
    } else {
      result[indexYYYYto] = `19${arr[indexYYfrom]}`;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
