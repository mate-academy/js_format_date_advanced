'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitter = fromFormat[3];
  const dateArray = date.split(splitter);

  let needToReverse = 0;
  let fromLength = 0;
  let toLength = 0;

  for (let i = 0; i < 4; i++) {
    if (fromFormat[i].includes('Y') && toFormat[i].indexOf('Y') === -1) {
      needToReverse = 1;
    }

    if (fromFormat[i].includes('Y')) {
      fromLength = fromFormat[i].length;
    }

    if (toFormat[i].includes('Y')) {
      toLength = toFormat[i].length;
    }
  }

  let needToExpand = false;
  let needToCut = false;

  if (fromLength > toLength) {
    needToCut = true;
  }

  if (fromLength < toLength) {
    needToExpand = true;
  }

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')
      && dateArray[i].slice(-2) >= 30
      && needToExpand) {
      dateArray[i] = `19${dateArray[i]}`;
    }

    if (fromFormat[i].includes('Y')
      && dateArray[i].slice(-2) < 30
      && needToExpand) {
      dateArray[i] = `20${dateArray[i]}`;
    }

    if (fromFormat[i].includes('Y')
      && dateArray[i].slice(-2) >= 30
      && needToCut) {
      dateArray[i] = dateArray[i].slice(-2);
    }

    if (fromFormat[i].includes('Y')
      && dateArray[i].slice(-2) < 30
      && needToCut) {
      dateArray[i] = dateArray[i].slice(-2);
    }
  }

  const separator = toFormat[3];

  if (needToReverse === 1) {
    return dateArray.reverse().join(separator);
  }

  if (needToReverse === 0) {
    return dateArray.join(separator);
  }
}

module.exports = formatDate;
