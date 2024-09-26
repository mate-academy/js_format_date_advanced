'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const YEAR_SHORT = 'YY';
  const YEAR_LONG = 'YYYY';
  const MONTH = 'MM';
  const DAY = 'DD';
  const newDateFormat = [];

  const actualDate = {
    read() {
      for (let i = 0; i < fromFormat.length - 1; ++i) {
        switch (fromFormat[i]) {
          case YEAR_LONG:
            this.year = date.split(fromSeparator)[i];
            break;

          case YEAR_SHORT:
            this.year = date.split(fromSeparator)[i];
            break;

          case MONTH:
            this.month = date.split(fromSeparator)[i];
            break;

          case DAY:
            this.day = date.split(fromSeparator)[i];
        }
      }
    },
  };

  actualDate.read();

  for (let i = 0; i < toFormat.length - 1; ++i) {
    switch (toFormat[i]) {
      case YEAR_LONG:
        newDateFormat.push(changeYearFormat(actualDate.year, YEAR_LONG));
        break;

      case YEAR_SHORT:
        newDateFormat.push(changeYearFormat(actualDate.year, YEAR_SHORT));
        break;

      case MONTH:
        newDateFormat.push(actualDate.month);
        break;

      case DAY:
        newDateFormat.push(actualDate.day);
    }
  }

  return newDateFormat.join(toSeparator);
}

function changeYearFormat(year, toFormat) {
  switch (toFormat) {
    case 'YY': {
      if (year > 1000) {
        return year % 1000 % 100;
      }
      break;
    }

    case 'YYYY': {
      if (year < 1000) {
        if (year % 1000 % 100 < 30) {
          return 2000 + +year;
        } else {
          return 1900 + +year;
        }
      }
      break;
    }
  }

  return year;
}

module.exports = formatDate;
