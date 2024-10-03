'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const dateParts = date.split(separatorFrom);
  const formattedDate = [];

  let oldIndexDay = 0;
  let oldIndexMonth = 0;
  let oldIndexYear = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i][0] === 'Y') {
      oldIndexYear = i;
    }

    if (fromFormat[i][0] === 'M') {
      oldIndexMonth = i;
    }

    if (fromFormat[i][0] === 'D') {
      oldIndexDay = i;
    }
  }

  let newIndexDay = 0;
  let newIndexMonth = 0;
  let newIndexYear = 0;

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i][0] === 'Y') {
      newIndexYear = i;
    }

    if (toFormat[i][0] === 'M') {
      newIndexMonth = i;
    }

    if (toFormat[i][0] === 'D') {
      newIndexDay = i;
    }
  }

  let newYearFormat = dateParts[oldIndexYear];

  if (
    fromFormat[oldIndexYear].length === 2 &&
    toFormat[newIndexYear].length === 4
  ) {
    if (+newYearFormat < 30) {
      newYearFormat = '20' + newYearFormat;
    } else {
      newYearFormat = '19' + newYearFormat;
    }
  } else if (
    fromFormat[oldIndexYear].length === 4 &&
    toFormat[newIndexYear].length === 2
  ) {
    newYearFormat = newYearFormat.slice(-2);
  }

  formattedDate[newIndexDay] = dateParts[oldIndexDay];
  formattedDate[newIndexMonth] = dateParts[oldIndexMonth];
  formattedDate[newIndexYear] = newYearFormat;

  const newFormattedDate = formattedDate.join(separatorTo);

  return newFormattedDate;
}

module.exports = formatDate;
