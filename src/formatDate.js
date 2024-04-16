'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const inputDate = {};
  const orderedArr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const type = fromFormat[i][0].toLocaleLowerCase();
    const value = date.split(fromFormat[3])[i];

    inputDate[type] = value;

    if (type === 'y') {
      inputDate.yearFormat = fromFormat[i].length;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const type = toFormat[i][0].toLocaleLowerCase();

    if (type === 'y') {
      const toYearFormat = toFormat[i].length;

      if (toYearFormat < inputDate.yearFormat) {
        inputDate.y = inputDate.y.slice(2);
      } else if (toYearFormat > inputDate.yearFormat) {
        const century = (+inputDate.y < 30) ? '20' : '19';

        inputDate.y = century + inputDate.y;
      }
    }

    orderedArr.push(inputDate[type]);
  }

  return orderedArr.join(toFormat[3]);
}

module.exports = formatDate;
