'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateFromArr = date.split(fromFormat[3]);
  const dateData = {
    year:
      dateFromArr[fromFormat.indexOf('YYYY')]
      || dateFromArr[fromFormat.indexOf('YY')],
    month: dateFromArr[fromFormat.indexOf('MM')],
    day: dateFromArr[fromFormat.indexOf('DD')],
  };
  const dateToArr = [];

  toFormat.forEach((item, index) => {
    if (item === 'YYYY') {
      const year
        = parseInt(dateData.year.slice(-2)) < 30
          ? `20${dateData.year.slice(-2)}`
          : `19${dateData.year.slice(-2)}`;

      dateToArr[index] = year;
    } else if (item === 'YY') {
      dateToArr[index] = dateData.year.slice(-2);
    } else if (item === 'MM') {
      dateToArr[index] = dateData.month;
    } else if (item === 'DD') {
      dateToArr[index] = dateData.day;
    }
  });

  return dateToArr.join(toFormat[3]);
}

module.exports = formatDate;
