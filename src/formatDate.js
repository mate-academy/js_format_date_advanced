'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFirst = fromFormat[fromFormat.length - 1];
  const elementsOfDate = date.split(separatorFirst);
  const map = {};
  let key = '';
  let value = '';

  const resultArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    key = fromFormat[i];
    value = elementsOfDate[i];
    map[key] = value;
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const shortYear = Number(map['YY']);

    if (!isNaN(shortYear) && shortYear < 30) {
      map['YYYY'] = (2000 + shortYear).toString();
    } else {
      map['YYYY'] = (1900 + shortYear).toString();
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    let longYear = Number(map['YYYY']);

    if (!isNaN(longYear)) {
      longYear = longYear.toString();
      map['YY'] = longYear.slice(-2);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    key = toFormat[i];
    resultArray.push(map[key]);
  }

  const separatorSecond = toFormat[toFormat.length - 1];

  return resultArray.join(separatorSecond);
}

module.exports = formatDate;
