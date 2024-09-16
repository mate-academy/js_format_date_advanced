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
  const newDateArr = [];
  const seperetor = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const dateArr = date.split(seperetor);
  const dateObj = {
    DD: 0,
    MM: 0,
    YY: 0,
    YYYY: 0,
  };

  for (let i = 0; i < fromFormat.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  if (dateObj.YY === 0) {
    dateObj.YY = dateObj.YYYY.slice(2);
  }

  if (dateObj.YYYY === 0) {
    dateObj.YYYY = dateObj.YY < 30 ? `20${dateObj.YY}` : `19${dateObj.YY}`;
  }

  for (let i = 0; i < toFormat.length; i++) {
    newDateArr.push(dateObj[toFormat[i]]);
  }

  return newDateArr.join(newSeparator);
}


module.exports = formatDate;
