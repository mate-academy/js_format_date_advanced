/* eslint-disable no-unused-expressions */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let separator = fromFormat[3];
  const splitedDate = date.split(separator);
  const toFormatWithOutSep = toFormat.splice(0, 3);
  const arrResult = [];
  const objDateInfo = {
    YY: 'YY',
    MM: 'MM',
    DD: 'DD',
    YYYY: 'YYYY',
  };

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY' :
        objDateInfo['YYYY'] = splitedDate[i];
        objDateInfo['YY'] = splitedDate[i].slice(-2);
        break;
      case 'DD' :
        objDateInfo['DD'] = splitedDate[i];
        break;
      case 'MM':
        objDateInfo['MM'] = splitedDate[i];
        break;
      case 'YY':
        objDateInfo['YY'] = splitedDate[i];
        objDateInfo['YYYY'] = transform(splitedDate[i]);
        break;
    }
  }

  for (const char of toFormatWithOutSep) {
    arrResult.push(objDateInfo[char]);
  }
  separator = toFormat.slice(-1);

  return arrResult.join(separator);
}

function transform(date) {
  return date <= 29 ? 20 + date : 19 + date;
}
module.exports = formatDate;
