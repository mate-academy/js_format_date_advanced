'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let separator = fromFormat[fromFormat.length - 1];

  const truncatedDate = date.split(separator);

  const day = cutDay(fromFormat, truncatedDate);
  const month = cutMonth(fromFormat, truncatedDate);
  let year = cutYear(fromFormat, truncatedDate);

  const newYearLength = calculateNewYearLength(toFormat);

  year = decideYearFormat(year, newYearLength);

  separator = toFormat[toFormat.length - 1];

  const result = constructNewDateArray(toFormat, day, month, year).join(
    separator,
  );

  return result;
}

function calculateNewYearLength(toFormat) {
  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      return toFormat[i].length;
    }
  }
}

function cutDay(fromFormat, truncatedDate) {
  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('D')) {
      return truncatedDate[i];
    }
  }
}

function cutMonth(fromFormat, truncatedDate) {
  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('M')) {
      return truncatedDate[i];
    }
  }
}

function cutYear(fromFormat, truncatedDate) {
  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('Y')) {
      return truncatedDate[i];
    }
  }
}

function constructNewDateArray(toFormat, day, month, year) {
  const newDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      newDateParts.push(year);

      continue;
    }

    if (toFormat[i].includes('M')) {
      newDateParts.push(month);

      continue;
    }

    if (toFormat[i].includes('D')) {
      newDateParts.push(day);

      continue;
    }
  }

  return newDateParts;
}

function decideYearFormat(year, newYearLength) {
  let newYear = year;

  if (newYear.length > newYearLength) {
    newYear = newYear.slice(2);
  }

  if (newYear.length < newYearLength) {
    if (+newYear < 30) {
      newYear = `20${newYear}`;
    } else {
      newYear = `19${newYear}`;
    }
  }

  return newYear;
}

module.exports = formatDate;
