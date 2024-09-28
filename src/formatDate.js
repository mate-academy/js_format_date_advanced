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
  const splittedDate = date.split(fromFormat[3]);
  const oldDateObj = {};
  const result = [];

  for (let i = 0; i < splittedDate.length; i++) {
    oldDateObj[fromFormat[i]] = splittedDate[i];
    // make new object via input date;
  }
  changeYearsFormat(oldDateObj, toFormat);
  // this function delete old format for years and make new correct years format

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(oldDateObj[toFormat[i]]);
    // make array with new correct date format
  }

  // return string with result
  return result.join(toFormat[3]);
}

function changeYearsFormat(oldDateObj, arrayWithNewFormat) {
  // This function converts years format from oldDateObj
  // to year format in arrayWithNewFromat
  const { YY, YYYY } = oldDateObj;

  if (YY && arrayWithNewFormat.indexOf('YYYY') !== -1) {
    if (oldDateObj.YY < 30) {
      oldDateObj.YY = '20' + oldDateObj.YY;
    } else {
      oldDateObj.YY = '19' + oldDateObj.YY;
    }
    oldDateObj['YYYY'] = oldDateObj.YY;
    delete oldDateObj.YY;
  }

  if (YYYY && arrayWithNewFormat.indexOf('YY') !== -1) {
    oldDateObj.YYYY = oldDateObj.YYYY.slice(-2);
    oldDateObj['YY'] = oldDateObj.YYYY;
    delete oldDateObj.YYYY;
  }
}

module.exports = formatDate;
