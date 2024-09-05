'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const CENTURY_CONDITION = 30;
  const CENTURY_VALUE_1 = '20';
  const CENTURY_VALUE_2 = '19';
  const YEAR_LONG_FORMAT = 'YYYY';
  const YEAR_SHORT_FORMAT = 'YY';
  const FIRST_PART_OF_DATE_INDEX = 0;
  const LAST_PART_OF_DATE_INDEX = 2;

  const initialSeparator = fromFormat[fromFormat.length - 1];
  const finalSeparator = toFormat[toFormat.length - 1];
  const arrFromDate = date.split(initialSeparator);
  const initiaDateObj = {};
  const resultDate = [];
  let initialYearFormat = '';

  createObjectFromInitialDate();
  createNewDataFormat();

  return resultDate.join(finalSeparator);

  function createObjectFromInitialDate() {
    for (let i = FIRST_PART_OF_DATE_INDEX; i <= LAST_PART_OF_DATE_INDEX; i++) {
      initiaDateObj[fromFormat[i]] = arrFromDate[i];

      if (fromFormat[i].includes('Y')) {
        initialYearFormat = fromFormat[i];
      }
    }
  }

  function computeCentury() {
    return initiaDateObj.YY < CENTURY_CONDITION
      ? CENTURY_VALUE_1
      : CENTURY_VALUE_2;
  }

  function createNewDataFormat() {
    for (let i = FIRST_PART_OF_DATE_INDEX; i <= LAST_PART_OF_DATE_INDEX; i++) {
      const datePart = toFormat[i];
      const centuries = computeCentury();

      if (initialYearFormat !== datePart) {
        switch (datePart) {
          case YEAR_LONG_FORMAT:
            resultDate.push(centuries + initiaDateObj.YY);
            break;

          case YEAR_SHORT_FORMAT:
            resultDate.push(initiaDateObj.YYYY.slice(2));
            break;

          default: resultDate.push(initiaDateObj[datePart]);
        }
      }

      if (initialYearFormat === datePart) {
        resultDate.push(initiaDateObj[datePart]);
      }
    }
  }
}

module.exports = formatDate;
