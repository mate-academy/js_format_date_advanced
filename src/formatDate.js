'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const oldDateArr = date.split(fromSeparator);
  const structuredDate = {};
  const newDateFormatArr = [];
  const YEAR_KEY_LONG = 'YYYY';
  const YEAR_KEY_SHORT = 'YY';

  fromFormat.forEach((dateType, index) => {
    if (dateType === YEAR_KEY_SHORT) {
      structuredDate.YYYY = +oldDateArr[index] >= 30
        ? `19${oldDateArr[index]}`
        : `20${oldDateArr[index]}`;
    }

    structuredDate[dateType] = oldDateArr[index];
  });

  structuredDate[YEAR_KEY_SHORT] = structuredDate[YEAR_KEY_LONG].slice(2);

  toFormat.forEach((dateType) => {
    newDateFormatArr.push(structuredDate[dateType]);
  });

  return newDateFormatArr.join(toSeparator);
}

module.exports = formatDate;
