'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const ACTUAL_DATE_ARRAY = date.split(fromFormat[3]);
  let YEAR = 0;
  let MONTH = 0;
  let DAY = 0;

  const resultArray = [];

  for (const fromElem of fromFormat) {
    switch (fromElem) {
      case 'YYYY':
        YEAR = ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

        break;

      case 'YY':
        if (ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)] < 30) {
          YEAR = '20' + ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

          break;
        }

        YEAR = '19' + ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

        break;

      case 'MM':
        MONTH = ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

        break;
      case 'DD':
        DAY = ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

        break;
    };
  }

  for (const toElem of toFormat) {
    switch (toElem) {
      case 'YYYY':
        resultArray.push(YEAR);

        break;

      case 'YY':
        resultArray.push(YEAR.slice(2));

        break;

      case 'MM':
        resultArray.push(MONTH);

        break;

      case 'DD':
        resultArray.push(DAY);

        break;
    };
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
