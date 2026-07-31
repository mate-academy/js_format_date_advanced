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
  const result = [0, 0, 0];
  const newFormatYearIndex = toFormat.findIndex((item) => {
    return item === 'YYYY' || item === 'YY';
  });
  const newFormatDayIndex = toFormat.findIndex((item) => {
    return item === 'DD';
  });
  const newFormatMonthIndex = toFormat.findIndex((item) => {
    return item === 'MM';
  });
  const oldYearIndex = fromFormat.findIndex((item) => {
    return item === 'YYYY' || item === 'YY';
  });
  const oldFormatDayIndex = fromFormat.findIndex((item) => {
    return item === 'DD';
  });
  const oldFormatMonthIndex = fromFormat.findIndex((item) => {
    return item === 'MM';
  });

  if (fromFormat[oldYearIndex] !== toFormat[newFormatYearIndex]) {
    if (fromFormat[oldYearIndex] === 'YYYY') {
      dateSplit[oldYearIndex] = dateSplit[oldYearIndex].slice(2);
    }

    if (fromFormat[oldYearIndex] === 'YY') {
      if (+dateSplit[oldYearIndex] < 30) {
        dateSplit[oldYearIndex] = '20' + dateSplit[oldYearIndex];
      } else {
        dateSplit[oldYearIndex] = '19' + dateSplit[oldYearIndex];
      }
    }
  }

  result[newFormatYearIndex] = dateSplit[oldYearIndex];
  result[newFormatDayIndex] = dateSplit[oldFormatDayIndex];
  result[newFormatMonthIndex] = dateSplit[oldFormatMonthIndex];

  return result.join(toFormat[3]);
}

module.exports = formatDate;
