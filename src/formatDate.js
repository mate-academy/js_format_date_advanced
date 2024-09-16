'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitter = fromFormat[3];
  const splitterTo = toFormat[3];
  const dateArray = date.split(splitter);
  const toFormatDate = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i <= 2; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateArray[i];
        break;

      case 'MM':
        month = dateArray[i];
        break;

      case 'YY':
      case 'YYYY':
        year = dateArray[i];
        break;
    }
  }

  for (let i = 0; i <= 2; i++) {
    switch (toFormat[i]) {
      case 'DD':
        toFormatDate.push(day);
        break;

      case 'MM':
        toFormatDate.push(month);
        break;

      case 'YY':
        toFormatDate.push(year.slice(-2));
        break;

      case 'YYYY':
        if (year.length < 4 && Number(year.slice(-2)) < 30) {
          year = '20' + year;
        } else if (year.length < 4) {
          year = '19' + year;
        }

        toFormatDate.push(year);
        break;
    }
  }

  const formatedDate = toFormatDate.join(splitterTo);

  return formatedDate;
}

module.exports = formatDate;
