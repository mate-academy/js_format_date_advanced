'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  //  string just for commit1
  const MAX_YEAR_FOR_XXI_CENTURY = 30;
  const objFromDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const splitedDate = date.split(fromFormat[3]);

    objFromDate[fromFormat[i]] = splitedDate[i];
  }

  const result = [];

  for (const key in objFromDate) {
    for (let i = 0; i < toFormat.length - 1; i++) {
      if (key === toFormat[i]) {
        result[i] = objFromDate[key];
        continue;
      }

      if (toFormat[i] === 'YY' && key === 'YYYY') {
        result[i] = objFromDate[key].slice(2);
        continue;
      }

      if (toFormat[i] === 'YYYY' && key === 'YY') {
        if (+objFromDate[key] < MAX_YEAR_FOR_XXI_CENTURY) {
          result[i] = `20${objFromDate[key]}`;
          continue;
        }

        if (+objFromDate[key] >= MAX_YEAR_FOR_XXI_CENTURY) {
          result[i] = `19${objFromDate[key]}`;
        }
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
