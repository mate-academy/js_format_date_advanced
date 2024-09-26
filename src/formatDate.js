'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year = '';
  let month = '';
  let day = '';
  const [,,, separatorFF] = fromFormat;
  const [,,, separatorNF] = toFormat;

  const dates = date.split(separatorFF);
  const newFormat = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = dates[i];
        break;
      case 'MM':
        month = dates[i];
        break;
      case 'DD':
        day = dates[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
        if (toFormat[i].length < year.length) {
          newFormat.push(year.slice(2));
        } else {
          newFormat.push(year);
        }
        break;
      case 'YYYY':
        if (toFormat[i].length > year.length
          && year < 30) {
          newFormat.push(`20${year}`);
        } else if (toFormat[i].length > year.length
          && year >= 30) {
          newFormat.push(`19${year}`);
        } else {
          newFormat.push(year);
        }
        break;
      case 'MM':
        newFormat.push(month);
        break;
      case 'DD':
        newFormat.push(day);
        break;
    }
  }

  return newFormat.join(separatorNF);
}

module.exports = formatDate;
