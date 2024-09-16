'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const localFromFormat = date.split(fromFormat[3]);
  const localToFormat = {};

  for (let i = 0; i < localFromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        localToFormat['year'] = localFromFormat[i];
        break;

      case 'YY':
        if (Number(localFromFormat[i]) < 30) {
          localFromFormat[i] = `20${localFromFormat[i]}`;
        } else {
          localFromFormat[i] = `19${localFromFormat[i]}`;
        }
        localToFormat['year'] = localFromFormat[i];
        break;

      case 'MM':
        localToFormat['month'] = localFromFormat[i];
        break;

      case 'DD':
        localToFormat['day'] = localFromFormat[i];
        break;
    }
  }

  const localDate = [];

  for (let i = 0; i < localFromFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        localDate[i] = localToFormat['year'];
        break;
      case 'YY':
        localDate[i] = localToFormat['year'].slice(2);
        break;
      case 'MM':
        localDate[i] = localToFormat['month'];
        break;
      case 'DD':
        localDate[i] = localToFormat['day'];
        break;
    }
  }

  return localDate.join(toFormat[3]);
}

module.exports = formatDate;
