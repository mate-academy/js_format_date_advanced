'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD': {
        day = oldDate[i];

        break;
      }

      case 'MM': {
        month = oldDate[i];

        break;
      }

      default: {
        year = oldDate[i];

        break;
      }
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD': {
        newDate.push(day);

        break;
      }

      case 'MM': {
        newDate.push(month);

        break;
      }

      case 'YY': {
        if (year.length === 4) {
          newDate.push(year.slice(2));
        } else {
          newDate.push(year);
        }

        break;
      }

      case 'YYYY': {
        if (year.length === 4) {
          newDate.push(year);
        } else if (year.length === 2 && +year < 30) {
          newDate.push(`20${year}`);
        } else {
          newDate.push(`19${year}`);
        }
      }
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
