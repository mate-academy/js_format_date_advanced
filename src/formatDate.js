'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateComponents = date.split(fromFormat[3]);
  const formattedDateComponents = Array(3);

  const indexYY = fromFormat.indexOf('YY');
  const indexYYYY = fromFormat.indexOf('YYYY');
  const toIndexYY = toFormat.indexOf('YY');
  const toIndexYYYY = toFormat.indexOf('YYYY');

  if (indexYY !== -1 || indexYYYY !== -1) {
    const isFromYY = indexYY !== -1;
    const isToYY = toIndexYY !== -1;
    const fromIndex = isFromYY ? indexYY : indexYYYY;
    const toIndex = isToYY ? toIndexYY : toIndexYYYY;
    let year = dateComponents[fromIndex];

    if (isFromYY && !isToYY) {
      year = year < 30 ? '20' + year : '19' + year;
    }

    if (!isFromYY && isToYY) {
      year = year.slice(-2);
    }

    formattedDateComponents[toIndex] = year;
  }

  formattedDateComponents[toFormat.indexOf('DD')] =
    dateComponents[fromFormat.indexOf('DD')];

  formattedDateComponents[toFormat.indexOf('MM')] =
    dateComponents[fromFormat.indexOf('MM')];

  return formattedDateComponents.join(toFormat[3]);
}

module.exports = formatDate;
