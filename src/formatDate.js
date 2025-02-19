'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = { };
  const newDate = [];

  const oldDateFormat = fromFormat.slice(0, 3);
  const oldSeparator = fromFormat[3];
  const oldDateList = date.split(oldSeparator);

  const newSep = toFormat[3];
  const newDateFormat = toFormat.slice(0, 3);

  for (let i = 0; i < oldDateFormat.length; i++) {
    const element = oldDateFormat[i];

    dateObj[element] = oldDateList[i];
  }

  handleYearFormat(dateObj, toFormat);

  for (let i = 0; i < newDateFormat.length; i++) {
    newDate.push(dateObj[toFormat[i]]);
  }

  return newDate.join(newSep);
}

function handleYearFormat(dateObj, toFormat) {
  if ('YY' in dateObj && toFormat.includes('YYYY')) {
    if (dateObj.YY < 30) {
      dateObj.YYYY = `20${dateObj.YY}`;
    } else {
      dateObj.YYYY = `19${dateObj.YY}`;
    }

    delete dateObj.YY;
  }

  if ('YYYY' in dateObj && toFormat.includes('YY')) {
    dateObj.YY = dateObj.YYYY.slice(2);
    delete dateObj.YYYY;
  }
}

module.exports = formatDate;
