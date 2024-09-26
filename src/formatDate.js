'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const keyAndValues = new Map();
  const dataArr = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    keyAndValues.set(fromFormat[i], dataArr[i]);
  }

  const resultArr = [];
  const tempToFormat = `${toFormat[0]} ${toFormat[1]} ${toFormat[2]}`;
  const tempFromFormat = `${fromFormat[0]} ${fromFormat[1]} ${fromFormat[2]}`;

  if (tempFromFormat.length > tempToFormat.length) {
    const tempEl = keyAndValues.get('YYYY').slice(2);

    keyAndValues.set('YY', tempEl);
  }

  if (tempFromFormat.length < tempToFormat.length) {
    let tempEl = keyAndValues.get('YY');

    if (tempEl < 30) {
      tempEl = '20' + tempEl;
    } else {
      tempEl = '19' + tempEl;
    }
    keyAndValues.set('YYYY', tempEl);
  }

  for (let i = 0; i < 3; i++) {
    resultArr[i] = keyAndValues.get(toFormat[i]);
  }

  return `${resultArr[0]}${toFormat[3]}${resultArr[1]}${toFormat[3]}${resultArr[2]}`;
}

module.exports = formatDate;
