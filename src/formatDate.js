'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  let year, smallYear, month, day;
  const resultArray = [];
  let resultDate = '';

  const yearString = 'YYYY';
  const smallYearString = 'YY';
  const monthString = 'MM';
  const dayString = 'DD';

  const fromArray = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case yearString: {
        year = fromArray[i];

        break;
      }

      case smallYearString: {
        smallYear = fromArray[i];

        break;
      }

      case monthString: {
        month = fromArray[i];

        break;
      }

      case dayString: {
        day = fromArray[i];

        break;
      }
    }
  }

  if (year !== undefined && year !== null) {
    smallYear = year.slice(2);
  }

  if (smallYear !== undefined && smallYear !== null) {
    if (smallYear < 30) {
      year = 2000 + Number(smallYear);
    } else {
      year = 1900 + Number(smallYear);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case yearString: {
        resultArray.push(year);

        break;
      }

      case smallYearString: {
        resultArray.push(smallYear);

        break;
      }

      case monthString: {
        resultArray.push(month);

        break;
      }

      case dayString: {
        resultArray.push(day);

        break;
      }
    }
  }

  resultDate = resultArray.join(toSeparator);

  return resultDate;
}

module.exports = formatDate;
