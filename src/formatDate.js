'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);

  let year = dateArray[fromFormat.indexOf('YYYY')];

  if (fromFormat.includes('YYYY') && !toFormat.includes('YYYY')) {
    year = year.slice(2);
  }

  if (fromFormat.includes('YY') && !toFormat.includes('YY')) {
    year = dateArray[fromFormat.indexOf('YY')];

    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDate[i] = dateArray[fromFormat.indexOf('DD')];
        break;

      case 'MM':
        newDate[i] = dateArray[fromFormat.indexOf('MM')];
        break;

      case 'YYYY':
        newDate[i] = year;
        break;

      case 'YY':
        newDate[i] = year;
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
