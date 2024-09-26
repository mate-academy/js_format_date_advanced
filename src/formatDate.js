'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dataNewFormat = [];
  const dataDate = date.split(fromFormat[3]);

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD': day = dataDate[i];
        break;

      case 'MM': month = dataDate[i];
        break;

      default: year = dataDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD': dataNewFormat[i] = day;
        break;

      case 'MM': dataNewFormat[i] = month;
        break;

      default: if (toFormat[i].length === year.length) {
        dataNewFormat[i] = year;
        continue;
      }

        if (toFormat[i].length < year.length) {
          dataNewFormat[i] = year.slice(2);
        }

        if (toFormat[i].length > year.length) {
          if (year < 30) {
            dataNewFormat[i] = `20${year}`;
          }

          if (year >= 30) {
            dataNewFormat[i] = `19${year}`;
          }
        }
    }
  }

  return dataNewFormat.join(toFormat[3]);
}

module.exports = formatDate;
