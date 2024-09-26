'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const initialDivider = fromFormat[fromFormat.length - 1];
  const finalDivider = toFormat[toFormat.length - 1];
  const dateArr = date.split(initialDivider);
  const resultDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const current = toFormat[i];
    let indexInFromFormat;

    if (!fromFormat.includes(current)) {
      indexInFromFormat = current === 'YY'
        ? fromFormat.indexOf('YYYY')
        : fromFormat.indexOf('YY');
    } else {
      indexInFromFormat = fromFormat.indexOf(current);
    }

    const dateMatchByIndex = dateArr[indexInFromFormat];

    switch (true) {
      case current.length < dateMatchByIndex.length:
        resultDate[i] = shortenYearFormat(dateMatchByIndex, current.length);
        break;

      case current.length > dateMatchByIndex.length:
        resultDate[i] = lengthenYearFormat(dateMatchByIndex);
        break;

      case current.length === dateMatchByIndex.length:
        resultDate[i] = dateMatchByIndex;
        break;

      default:
        break;
    }
  }

  return resultDate.join(finalDivider);
}

function shortenYearFormat(yearString, formatLength) {
  const shortYearString = yearString.slice(yearString.length - formatLength);

  return shortYearString;
}

function lengthenYearFormat(yearString) {
  const centuryEdge = 30;
  const previousCentury = '19';
  const currentCentury = '20';
  const fullYearString = Number(yearString) < centuryEdge
    ? currentCentury + yearString
    : previousCentury + yearString;

  return fullYearString;
}

module.exports = formatDate;
