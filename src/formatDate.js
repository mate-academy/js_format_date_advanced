'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromSeparator);
  const newDate = [];
  const newDateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (
      fromFormat[i] === 'YYYY' ||
      fromFormat[i] === 'YY' ||
      fromFormat[i] === 'MM' ||
      fromFormat[i] === 'DD'
    ) {
      newDateObj[fromFormat[i]] = dateParts[i];
    }
  }

  const centuryThreshold = 30;
  const pastCentury = '19';
  const actualCentury = '20';

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    newDateObj['YY'] = newDateObj['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (newDateObj['YY'] < centuryThreshold) {
      newDateObj['YYYY'] = actualCentury + newDateObj['YY'];
    } else {
      newDateObj['YYYY'] = pastCentury + newDateObj['YY'];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];

    if (part === 'YYYY') {
      newDate.push(newDateObj['YYYY']);
    }

    if (part === 'YY') {
      newDate.push(newDateObj['YY']);
    }

    if (part === 'MM') {
      newDate.push(newDateObj['MM']);
    }

    if (part === 'DD') {
      newDate.push(newDateObj['DD']);
    }
  }

  return newDate.join(toSeparator);
}
module.exports = formatDate;
