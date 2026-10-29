'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparateSymbol = fromFormat[3];
  const newSeparateSymbol = toFormat[3];
  const dateSplit = date.split(oldSeparateSymbol);

  // taking indexes
  const fromDayIndex = fromFormat.indexOf('DD');
  const fromMonthIndex = fromFormat.indexOf('MM');
  let fromYearIndex = fromFormat.indexOf('YYYY');
  let toYearIndex = toFormat.indexOf('YYYY');

  if (fromYearIndex === -1) {
    fromYearIndex = fromFormat.indexOf('YY');
  }

  if (toYearIndex === -1) {
    toYearIndex = toFormat.indexOf('YY');
  }

  const DayPosition = dateSplit[fromDayIndex];
  const MonthPosition = dateSplit[fromMonthIndex];
  const YearPosition = dateSplit[fromYearIndex];
  // formating date

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      dateSplit[i] = DayPosition;
    }

    if (toFormat[i] === 'MM') {
      dateSplit[i] = MonthPosition;
    }

    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      dateSplit[i] = YearPosition;
    }
  }

  if (fromFormat[fromYearIndex].length < toFormat[toYearIndex].length) {
    if (Number(dateSplit[toYearIndex]) < 30) {
      dateSplit[toYearIndex] = 2000 + Number(dateSplit[toYearIndex]);
    } else {
      dateSplit[toYearIndex] = 1900 + Number(dateSplit[toYearIndex]);
    }
  }

  if (fromFormat[fromYearIndex].length > toFormat[toYearIndex].length) {
    dateSplit[toYearIndex] = dateSplit[toYearIndex] % 100;
  }

  const formattedDate = dateSplit;

  return formattedDate.join(newSeparateSymbol);
}

module.exports = formatDate;
