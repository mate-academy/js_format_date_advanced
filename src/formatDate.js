'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[`${fromFormat.length - 1}`]);
  const dateObject = {};
  const resultArray = [];

  for (let i = 0; i < dateArray.length; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  if (dateObject.YYYY) {
    dateObject['YY'] = dateObject['YYYY'].split('').slice(2).join('');
  } else {
    if (dateObject['YY'] < 30) {
      dateObject['YYYY'] = `20${dateObject['YY']}`;
    } else {
      dateObject['YYYY'] = `19${dateObject['YY']}`;
    };
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    resultArray.push(dateObject[toFormat[i]]);
  }

  return resultArray.join(`${toFormat[3]}`);
}

module.exports = formatDate;
