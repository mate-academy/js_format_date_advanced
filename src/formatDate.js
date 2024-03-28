'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DATE = date.split(OLD_SEPARATOR);
  const {
    yearIndex: fromYear,
    monthIndex: fromMonth,
    dayIndex: fromDay,
  } = findComponentIndices(fromFormat);
  const {
    yearIndex: toYear,
    monthIndex: toMonth,
    dayIndex: toDay,
  } = findComponentIndices(toFormat);
  const month = DATE[fromMonth];
  const day = DATE[fromDay];
  const result = [];
  let year = DATE[fromYear];

  if (fromFormat[fromYear] === 'YYYY' && toFormat[toYear] === 'YY') {
    year = year.slice(-2);
  }

  if (fromFormat[fromYear] === 'YY' && toFormat[toYear] === 'YYYY') {
    if (year < 30) {
      year = `20${year}`;
    } else {
      year = `19${year}`;
    }
  }

  result[toYear] = year;
  result[toMonth] = month;
  result[toDay] = day;

  return result.join(NEW_SEPARATOR);
}

function findComponentIndices(data) {
  let yearIndex = 0;
  let monthIndex = 0;
  let dayIndex = 0;

  data.forEach((format, index) => {
    switch (format) {
      case 'YYYY':
      case 'YY':
        yearIndex = index;
        break;
      case 'MM':
        monthIndex = index;
        break;
      case 'DD':
        dayIndex = index;
        break;
    }
  });

  return { yearIndex, monthIndex, dayIndex };
}

module.exports = formatDate;
