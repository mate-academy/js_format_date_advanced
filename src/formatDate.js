'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const separatorPrevFormat = fromFormat.slice(-1);
  const dateArray = date.split(separatorPrevFormat);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = dateArray[i];
  }

  if (toFormat.includes('YYYY') && !dateObj.YYYY) {
    dateObj.YYYY = dateObj.YY < 30 ? '20' + dateObj.YY : '19' + dateObj.YY;
  }

  if (toFormat.includes('YY') && !dateObj.YY) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  }

  const [firstElNewFormat, secondElNewFormat, thirdElNewFormat] = toFormat;
  const separatorNewFormat = toFormat.slice(-1);

  const dateInNewFormat = [
    dateObj[firstElNewFormat],
    dateObj[secondElNewFormat],
    dateObj[thirdElNewFormat],
  ];

  return dateInNewFormat.join(separatorNewFormat);
}

module.exports = formatDate;
