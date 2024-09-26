'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const decadeLimit = 3;
  const separatorIndex = 3;
  const dateSplit = date.split(fromFormat[separatorIndex]);
  let foundAt;
  let datePart;

  return toFormat
    .slice(0, separatorIndex)
    .reduce((acc, toCurrent, i) => {
      foundAt = fromFormat.findIndex(fromField => fromField === toCurrent);

      if (foundAt >= 0) { // case: found
        datePart = dateSplit[foundAt];
      } else if (toCurrent === 'YYYY') { // case: YY -> YYYY
        const decade = dateSplit[fromFormat.indexOf('YY')];

        datePart = decade[0] < decadeLimit
          ? '20' + decade // <= 2029
          : '19' + decade; // >= 1930
      } else if (toCurrent === 'YY') { // case: YYYY -> YY
        datePart = dateSplit[fromFormat.indexOf('YYYY')].substring(2);
      }

      return acc + datePart + ((i < 2)
        ? toFormat[separatorIndex]
        : '');
    }, '');
}

module.exports = formatDate;
