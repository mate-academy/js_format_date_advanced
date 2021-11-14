'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const notFormattedDate = date.split(fromFormat[3]);
  const newDate = [];

  let yy, yyyy, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY': {
        yyyy = notFormattedDate[i];
        break;
      }

      case 'YY': {
        yy = notFormattedDate[i];
        break;
      }

      case 'MM': {
        month = notFormattedDate[i];
        break;
      }

      case 'DD': {
        day = notFormattedDate[i];
        break;
      }
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY': {
        if (yy < 30) {
          newDate.push(`20${yy}`);
        } else if (yy >= 30) {
          newDate.push(`19${yy}`);
        } else {
          newDate.push(yyyy);
        }
        break;
      }

      case 'YY': {
        if (yy === undefined) {
          newDate.push(yyyy.split('').slice(2).join(''));
        } else {
          newDate.push(yy);
        }
        break;
      }

      case 'MM': {
        newDate.push(month);
        break;
      }

      case 'DD': {
        newDate.push(day);
        break;
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
