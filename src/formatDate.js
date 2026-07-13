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
  let toYearFormat = '';
  let fromYearFormat = '';
  let result = '';

  if (toFormat.includes('YYYY')) {
    toYearFormat = 'YYYY';
  } else {
    toYearFormat = 'YY';
  }

  if (fromFormat.includes('YYYY')) {
    fromYearFormat = 'YYYY';
  } else {
    fromYearFormat = 'YY';
  }

  const fromYearIndex = fromFormat.indexOf(fromYearFormat);
  const toYearIndex = toFormat.indexOf(toYearFormat);

  if (fromYearFormat === toYearFormat) {
    newDate[toYearIndex] = dateSplit[fromYearIndex];
  } else {
    if (toYearFormat === 'YYYY') {
      if (+dateSplit[fromYearIndex] < yearBorder) {
        newDate[toYearIndex] = century20 + +dateSplit[fromYearIndex];
      } else {
        newDate[toYearIndex] = century19 + +dateSplit[fromYearIndex];
      }
    } else {
      newDate[toYearIndex] = dateSplit[fromYearIndex] - century19;
    }
  }

  newDate[toFormat.indexOf('MM')] = dateSplit[fromFormat.indexOf('MM')];
  newDate[toFormat.indexOf('DD')] = dateSplit[fromFormat.indexOf('DD')];

  result = newDate.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
