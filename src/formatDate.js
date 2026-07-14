'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplit = date.split(fromFormat[3]);
  const newDate = ['XX', 'XX', 'XX'];
  const century19 = 1900;
  const century20 = 2000;
  const yearBorder = 30;
  let result = '';

  const toYearFormat = toFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const fromYearFormat = fromFormat.includes('YYYY') ? 'YYYY' : 'YY';

  const fromYearIndex = fromFormat.indexOf(fromYearFormat);
  const toYearIndex = toFormat.indexOf(toYearFormat);

  if (fromYearFormat === 'YY') {
    if (+dateSplit[fromYearIndex] < yearBorder) {
      dateSplit[fromYearIndex] = century20 + +dateSplit[fromYearIndex];
    } else {
      dateSplit[fromYearIndex] = century19 + +dateSplit[fromYearIndex];
    }
  }

  if (toYearFormat === 'YY') {
    newDate[toYearIndex] = dateSplit[fromYearIndex].slice(-2);
  } else {
    newDate[toYearIndex] = dateSplit[fromYearIndex];
  }

  newDate[toFormat.indexOf('MM')] = dateSplit[fromFormat.indexOf('MM')];
  newDate[toFormat.indexOf('DD')] = dateSplit[fromFormat.indexOf('DD')];

  result = newDate.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
