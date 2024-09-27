'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const CURRENT_SPLITTER = fromFormat.slice(-1);
  const CURRENT_DATE = date.split(CURRENT_SPLITTER);
  const CURRENT_YEAR_POSITION = yearPosition(fromFormat);
  const CURRENT_YEAR_DIGITS = fromFormat[CURRENT_YEAR_POSITION].length;
  const NEW_SPLITTER = toFormat.slice(-1);
  const NEW_YEAR_POSITION = yearPosition(toFormat);
  const NEW_YEAR_DIGITS = toFormat[NEW_YEAR_POSITION].length;
  let YEAR = '';
  let MONTH = '';
  let DAY = '';
  let NEW_FORMAT = [];

  // If the number of digits in years is different, convert the year
  if (CURRENT_YEAR_DIGITS !== NEW_YEAR_DIGITS) {
    CURRENT_DATE[CURRENT_YEAR_POSITION]
    = convertingYear(CURRENT_DATE[CURRENT_YEAR_POSITION]);
  }

  // If the position of the years is different, rearrange the date components
  if (CURRENT_YEAR_POSITION !== NEW_YEAR_POSITION) {
    switch (CURRENT_YEAR_POSITION) {
      case 0:
        YEAR = CURRENT_DATE.shift();
        CURRENT_DATE.reverse();
        CURRENT_DATE.push(YEAR);
        NEW_FORMAT = CURRENT_DATE;
        break;

      case 1:
        DAY = CURRENT_DATE.pop();
        MONTH = CURRENT_DATE.shift();

        if (NEW_YEAR_POSITION === 2) {
          CURRENT_DATE.unshift(MONTH);
          CURRENT_DATE.unshift(DAY);
        } else {
          CURRENT_DATE.push(MONTH);
          CURRENT_DATE.push(DAY);
        }
        NEW_FORMAT = CURRENT_DATE;
        break;

      case 2:
        YEAR = CURRENT_DATE.pop();
        CURRENT_DATE.reverse();
        CURRENT_DATE.unshift(YEAR);
        NEW_FORMAT = CURRENT_DATE;
        break;
    };
  };

  NEW_FORMAT = CURRENT_DATE;

  return NEW_FORMAT.join(NEW_SPLITTER);
};

// Function for determining the position of year symbols
function yearPosition(inputDate) {
  return Math.max(inputDate.indexOf('YYYY'), inputDate.indexOf('YY'));
};

// Year character conversion function
function convertingYear(inputYear) {
  const YEAR_TO_NUM = +inputYear;
  const NUMBER_OF_CHARACTERS = inputYear.length;
  const LAST_CENTURY = 19;
  const CURRENT_CENTURY = 20;
  const CONVERSION_POINTER = 30;

  switch (NUMBER_OF_CHARACTERS) {
    case 2:
      if (YEAR_TO_NUM < CONVERSION_POINTER) {
        return CURRENT_CENTURY + inputYear;
      };

      return LAST_CENTURY + inputYear;

    case 4:
      return inputYear.slice(2);
  }
};

module.exports = formatDate;
