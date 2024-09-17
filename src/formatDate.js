'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // magic numbers
  const previousMillennium = 19;
  const currentlyMillennium = 20;
  const yearLimit = 30;
  const twoDigitFormat = 2;
  const fourDigitFormat = 4;
  const indexSeparator = 3;

  // make an array from the date
  const arrayParam = date.split(fromFormat[indexSeparator]);

  let day;
  let month;
  let year;
  const resultArray = [];

  // determine day, month and year
  for (const i in fromFormat) {
    switch (fromFormat[i]) {
      case 'DD': day = arrayParam[i]; break;
      case 'MM': month = arrayParam[i]; break;
      case 'YY': year = arrayParam[i]; break;
      case 'YYYY': year = arrayParam[i];
    }
  }

  // fill resultArray  in new format
  for (const i in toFormat) {
    switch (toFormat[i]) {
      case 'DD':resultArray[i] = day; break;
      case 'MM':resultArray[i] = month; break;
      case 'YY':resultArray[i] = year.substring(2); break;

      case 'YYYY':
        if (year.length === twoDigitFormat && year >= yearLimit) {
          resultArray[i] = previousMillennium + year;
        }

        if (year.length === twoDigitFormat && year < yearLimit) {
          resultArray[i] = currentlyMillennium + year;
        }

        if (year.length === fourDigitFormat) {
          resultArray[i] = year;
        }
    }
  }

  return resultArray.join(toFormat[indexSeparator]);
}

module.exports = formatDate;
