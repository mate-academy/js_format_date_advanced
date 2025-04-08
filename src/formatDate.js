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
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const word = date.split(separatorFrom);
  const objFromDate = {};
  const objToDate = {};
  let strToDate = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objFromDate[fromFormat[i]] = word[i];
    objToDate[toFormat[i]] = '';
  }

  for (const keyTo in objToDate) {
    for (const keyFrom in objFromDate) {
      if (keyTo === keyFrom) {
        objToDate[keyTo] = objFromDate[keyFrom];
      }

      if (keyTo === 'YYYY' && keyFrom === 'YY') {
        objToDate['YYYY'] = objFromDate['YY'];
      } else if (keyTo === 'YY' && keyFrom === 'YYYY') {
        objToDate['YY'] = objFromDate['YYYY'];
      }
    }
  }

  if ('YY' in objFromDate && 'YYYY' in objToDate) {
    if (objToDate['YYYY'] < 30) {
      objToDate['YYYY'] = '20' + objToDate['YYYY'];
    } else {
      objToDate['YYYY'] = '19' + objToDate['YYYY'];
    }
  }

  if ('YYYY' in objFromDate && 'YY' in objToDate) {
    objToDate['YY'] = objToDate['YY'].slice(-2);
  }

  const keys = Object.keys(objToDate);

  for (let i = 0; i < keys.length; i++) {
    if (i > 0) {
      strToDate += separatorTo;
    }

    strToDate += objToDate[keys[i]];
  }

  return strToDate;
}

module.exports = formatDate;
