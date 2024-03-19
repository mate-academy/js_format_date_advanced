'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedData = date.split(fromFormat[3]);
  const newData = new Array(toFormat.length).fill('');

  for (let i = 0; i < fromFormat.length; i++) {
    const dataElement = fromFormat[i];

    if (dataElement === 'DD') {
      const dayIndexToFinding = i;
      const dayIndexToAdding = toFormat.indexOf('DD');

      newData[dayIndexToAdding] = splittedData[dayIndexToFinding];
    } else if (dataElement === 'MM') {
      const monthIndexToFinding = i;
      const monthIndexToAdding = toFormat.indexOf('MM');

      newData[monthIndexToAdding] = splittedData[monthIndexToFinding];
    } else if (dataElement === 'YY' || dataElement === 'YYYY') {
      let year = splittedData[i];
      let yearIndexToAdding;

      for (let j = 0; j < toFormat.length; j++) {
        const yearFormatElement = toFormat[j];

        if (yearFormatElement === 'YY') {
          yearIndexToAdding = j;

          if (year.length === 4) {
            year = year.slice(-2);
          }
        } else if (yearFormatElement === 'YYYY') {
          yearIndexToAdding = j;

          if (year.length === 2 && year < 30) {
            year = `20${year}`;
          } else if (year.length === 2) {
            year = `19${year}`;
          }
        }
      }

      newData[yearIndexToAdding] = year;
    }
  }

  return newData.join(toFormat[3]).slice(0, -1);
}
module.exports = formatDate;
