'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const datePartsKeys = ['YYYY', 'YY', 'MM', 'DD'];
  const fromSeparator = fromFormat.find((f) => !datePartsKeys.includes(f));
  const toSeparator = toFormat.find((f) => !datePartsKeys.includes(f)) || '';
  const datePartsArray = date.split(fromSeparator);
  const fromIndexes = {
    YYYY: fromFormat.indexOf('YYYY'),
    YY: fromFormat.indexOf('YY'),
    MM: fromFormat.indexOf('MM'),
    DD: fromFormat.indexOf('DD'),
  };
  const dateParts = {};

  if (fromIndexes.YYYY !== -1) {
    dateParts.YYYY = datePartsArray[fromIndexes.YYYY];
  }

  if (fromIndexes.YY !== -1) {
    dateParts.YY = datePartsArray[fromIndexes.YY];
  }

  if (fromIndexes.MM !== -1) {
    dateParts.MM = datePartsArray[fromIndexes.MM];
  }

  if (fromIndexes.DD !== -1) {
    dateParts.DD = datePartsArray[fromIndexes.DD];
  }

  if (dateParts.YY && !dateParts.YYYY) {
    const yy = Number(dateParts.YY);

    dateParts.YYYY = yy < 30 ? '20' + dateParts.YY : '19' + dateParts.YY;
  }

  if (dateParts.YYYY && !dateParts.YY) {
    dateParts.YY = dateParts.YYYY.slice(-2);
  }

  const partsOnly = toFormat.filter((f) => datePartsKeys.includes(f));
  const resultParts = partsOnly.map((part) => dateParts[part]);

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
