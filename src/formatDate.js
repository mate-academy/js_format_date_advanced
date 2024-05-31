'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitElement = fromFormat[fromFormat.length - 1];
  const joinElement = toFormat[toFormat.length - 1];

  const arrOfDate = date.split(splitElement);
  const newDateArr = [];

  const varDay = 'DD';
  const varMonth = 'MM';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === varDay) {
      const index = toFormat.indexOf(varDay);
      const day = arrOfDate[i];

      newDateArr[index] = day;
    } else if (fromFormat[i] === varMonth) {
      const index = toFormat.indexOf(varMonth);
      const month = arrOfDate[i];

      newDateArr[index] = month;
    } else {
      const fromFormatYear = fromFormat[i];
      let year = arrOfDate[i];

      for (let j = 0; j < toFormat.length - 1; j++) {
        if ((toFormat[j] !== varDay) & (toFormat[j] !== varMonth)) {
          const toFormatYear = toFormat[j];

          const index = j;

          if (fromFormatYear.length > toFormatYear.length) {
            year = year.slice(-2);
          }

          if (fromFormatYear.length < toFormatYear.length) {
            if (year < 30) {
              year = `20${year}`;
            } else {
              year = `19${year}`;
            }
          }

          newDateArr[index] = year;
        }
      }
    }
  }

  return newDateArr.join(joinElement);
}

module.exports = formatDate;
