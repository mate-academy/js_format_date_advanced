'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const factDate = date.split(fromFormat[fromFormat.length - 1]);
  const fromFormatCopy = [...fromFormat];
  const resultArray = [...toFormat];
  const LONG_YEAR_FORMAT = 'YYYY';
  const SHORT_YEAR_FORMAT = 'YY';

  fromFormatCopy.splice(-1, 1);
  resultArray.splice(-1, 1);

  if ((fromFormatCopy.includes(LONG_YEAR_FORMAT)
    && toFormat.includes(LONG_YEAR_FORMAT))
    || (fromFormatCopy.includes(SHORT_YEAR_FORMAT)
    && toFormat.includes(SHORT_YEAR_FORMAT))) {
    cycle(fromFormatCopy, toFormat, resultArray, factDate);
  }

  if (fromFormatCopy.includes(LONG_YEAR_FORMAT)
    && toFormat.includes(SHORT_YEAR_FORMAT)) {
    const longDateIndex = fromFormatCopy.indexOf(LONG_YEAR_FORMAT);

    factDate[longDateIndex] = factDate[longDateIndex].slice(-2);

    fromFormatCopy[longDateIndex] = SHORT_YEAR_FORMAT;
    cycle(fromFormatCopy, toFormat, resultArray, factDate);
  }

  if (fromFormatCopy.includes(SHORT_YEAR_FORMAT)
    && toFormat.includes(LONG_YEAR_FORMAT)) {
    const shortDateIndex = fromFormatCopy.indexOf(SHORT_YEAR_FORMAT);

    fromFormatCopy[shortDateIndex] = LONG_YEAR_FORMAT;

    if (factDate[shortDateIndex] < 30) {
      factDate[shortDateIndex] = `20${factDate[shortDateIndex]}`;
    } else {
      factDate[shortDateIndex] = `19${factDate[shortDateIndex]}`;
    }

    cycle(fromFormatCopy, toFormat, resultArray, factDate);
  }

  return resultArray.join(toFormat[toFormat.length - 1]);
}

function cycle(
  fromFormatCopyCycle,
  toFormatCycle,
  resultArrayCycle,
  factDateCycle
) {
  for (let i = 0; i < fromFormatCopyCycle.length; i++) {
    const index = toFormatCycle.indexOf(fromFormatCopyCycle[i]);

    resultArrayCycle[index] = factDateCycle[i];
  }
}

module.exports = formatDate;
