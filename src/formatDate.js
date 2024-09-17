'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const currentDate = date.split(fromSeparator);
  const day = currentDate[fromFormat.findIndex(el => el === 'DD')];
  const month = currentDate[fromFormat.findIndex(el => el === 'MM')];
  const year = currentDate[fromFormat.findIndex(el => el[0] === 'Y')];
  const fromYear = fromFormat.find(el => el[0] === 'Y');
  const toYear = toFormat.find(el => el[0] === 'Y');
  let newDate;
  let newYear = year;

  if (fromYear.length > toYear.length) {
    newYear = year.slice(2);
  }

  if (fromYear.length < toYear.length) {
    if (year < 30) {
      newYear = '20' + year;
    } else {
      newYear = '19' + year;
    }
  }

  if (toFormat[0] === 'DD') {
    newDate = [day, month, newYear];
  }

  if (toFormat[1] === 'DD') {
    newDate = [month, day, newYear];
  }

  if (toFormat[2] === 'DD') {
    newDate = [newYear, month, day];
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
