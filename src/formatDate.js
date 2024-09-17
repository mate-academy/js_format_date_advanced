'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const previousFormat = date.split(separatorFrom);

  const yearFullPlace = fromFormat.indexOf('YYYY');
  const yearPlace = fromFormat.indexOf('YY');
  const monthPlace = fromFormat.indexOf('MM');
  const dayPlace = fromFormat.indexOf('DD');

  const yearFull = previousFormat[yearFullPlace];
  let year = previousFormat[yearPlace];
  const month = previousFormat[monthPlace];
  const day = previousFormat[dayPlace];

  const formattedDate = [];

  if (yearFull !== undefined) {
    year = yearFull;
  }

  if (year !== undefined && year.length === 2) {
    if (year >= 30) {
      year = '19' + year;
    } else {
      year = '20' + year;
    }
  }

  for (let i = 0; i <= toFormat.length - 2; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formattedDate.push(day);
        break;

      case 'MM':
        formattedDate.push(month);
        break;

      case 'YYYY':
        formattedDate.push(year);
        break;

      case 'YY':
        formattedDate.push(year.substring(2, 4));
        break;

      default:
        throw new Error('Wrong format data.');
    }
  }

  return formattedDate.join(separatorTo);
}

module.exports = formatDate;
