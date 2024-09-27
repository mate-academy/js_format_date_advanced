'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat.at(-1));
  const dateObj = {};
  const formatedDate = [];
  let countY = 0;

  // create an abject with a key 'y'- year 'm' - month 'd' - day
  // and value from dateArr which relates to key,
  // also in if statement we find out the lengh of year
  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i][0]] = dateArr[i];

    if (toFormat[i].startsWith('Y')) {
      countY += toFormat[i].length;
    }
  }

  // if the length of a year in date > length of Y in pattern,
  // we make date = last 2 digits;
  if (dateObj.Y.length > countY) {
    dateObj.Y = dateObj.Y.slice(-2);
  }

  // if the length of a year in date < length of Y in pattern,
  // we have to check if the date < 30, we add 20 in the beginning,
  // otherwise add 19
  if (dateObj.Y.length < countY) {
    if (+dateArr[0] < 30) {
      dateObj.Y = '20' + dateArr[0];
    } else {
      dateObj.Y = '19' + dateArr[0];
    }
  }

  // so now we have formatted date in the object, and we need to push it
  // to array in the right order
  for (let i = 0; i < toFormat.length - 1; i++) {
    formatedDate.push(dateObj[toFormat[i][0]]);
  }

  // return the string with the correct separator by taking
  // the last element from pattern
  return formatedDate.join(toFormat.at(-1));
}

module.exports = formatDate;
