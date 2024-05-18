'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  const formattedDateParts = {
    YYYY: '',
    MM: '',
    DD: '',
  };

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        formattedDateParts['YYYY'] = dateParts[i].substring(0, 4);

        if (toFormat.includes('YY')) {
          formattedDateParts['YY'] = dateParts[i].substring(2, 4);
        }
        break;

      case 'YY':
        let year = dateParts[i];

        if (parseInt(year) < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }

        formattedDateParts['YYYY'] = year;
        break;

      case 'MM':
        formattedDateParts['MM'] = dateParts[i];
        break;
      case 'DD':
        formattedDateParts['DD'] = dateParts[i];
        break;
    }
  }

  const newArray = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    newArray.push(formattedDateParts[toFormat[i]]);
  }

  return newArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
