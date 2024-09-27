'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();

  const copyDate = date.split(separatorFrom);
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i][0]) {
      case 'Y':
        year = copyDate[i];

        if (fromFormat[i].length === 2) {
          year = '19' + copyDate[i];
        }

        if (fromFormat[i].length === 2 && +copyDate[i] < 30) {
          year = '20' + copyDate[i];
        }
        break;

      case 'M': month = copyDate[i];
        break;

      case 'D': day = copyDate[i];
        break;

      default:
        throw new Error('unexpected action');
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i][0]) {
      case 'Y':
        if (toFormat[i].length === 2) {
          year = year.slice(2);
        }

        copyDate[i] = year;
        break;

      case 'M':
        copyDate[i] = month;
        break;

      case 'D':
        copyDate[i] = day;
        break;

      default:
        throw new Error('unexpected action');
    }
  }

  return copyDate.join(separatorTo);
}

module.exports = formatDate;
