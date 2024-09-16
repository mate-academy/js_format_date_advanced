'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SHORT_YEAR_FORMAT = 'YY';
  const LONG_YEAR_FORMAT = 'YYYY';

  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const dateValues = date.split(fromSeparator);
  const collectedDateValues = {};
  const newDateFormat = [];

  for (let i = 0; i < dateValues.length; i++) {
    const currentDateKey = fromFormat[i];
    const currentDateValue = dateValues[i];

    if (currentDateKey === SHORT_YEAR_FORMAT) {
      collectedDateValues[LONG_YEAR_FORMAT] = currentDateValue >= 30
        ? `19${currentDateValue}`
        : `20${currentDateValue}`;
    }

    if (currentDateKey === LONG_YEAR_FORMAT) {
      collectedDateValues[SHORT_YEAR_FORMAT] = currentDateValue.slice(2);
    }

    collectedDateValues[currentDateKey] = currentDateValue;
  }

  for (const newFormatPart of toFormat) {
    newDateFormat.push(collectedDateValues[newFormatPart]);
  }

  return newDateFormat.join(toSeparator);
}

module.exports = formatDate;
