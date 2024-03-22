'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_INDEX = 3;
  const DAYS_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const SHORT_YEAR_FORMAT_LENGTH = 2;

  const partsOfDate = date.split(fromFormat[SEPARATOR_INDEX]);
  const resultArray = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].startsWith('Y')) {
      const indexOfYear = fromFormat.findIndex((str) => str.startsWith('Y'));
      const yearFromDate = partsOfDate[indexOfYear];

      const differencesFormats =
        toFormat[i].length - fromFormat[indexOfYear].length;

      switch (differencesFormats) {
        case -2: {
          resultArray[i] = yearFromDate.slice(SHORT_YEAR_FORMAT_LENGTH);
          break;
        }

        case 2: {
          const resultYear =
            +yearFromDate < 30 ? 20 + yearFromDate : 19 + yearFromDate;

          resultArray[i] = resultYear;
          break;
        }

        default: {
          resultArray[i] = yearFromDate;
        }
      }
    }

    if (toFormat[i].startsWith('M')) {
      const monthFromDate = partsOfDate[fromFormat.indexOf(MONTH_FORMAT)];

      resultArray[i] = monthFromDate;
    }

    if (toFormat[i].startsWith('D')) {
      const daysFromDate = partsOfDate[fromFormat.indexOf(DAYS_FORMAT)];

      resultArray[i] = daysFromDate;
    }
  }

  return resultArray.join(toFormat[SEPARATOR_INDEX]);
}

module.exports = formatDate;
