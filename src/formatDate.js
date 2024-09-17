'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [firstOldElem, secondOldElem, thirdOldElem, oldStparator] = fromFormat;
  const normalDate = date.split(oldStparator);
  const objOldFormatDate = {};

  objOldFormatDate[firstOldElem] = normalDate[0];
  objOldFormatDate[secondOldElem] = normalDate[1];
  objOldFormatDate[thirdOldElem] = normalDate[2];

  const arrNewFormatDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      if (toFormat[i] in objOldFormatDate) {
        arrNewFormatDate.push(objOldFormatDate[toFormat[i]]);
        continue;
      } else {
        arrNewFormatDate.push(objOldFormatDate['YYYY'].slice(2, 4));
        continue;
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (toFormat[i] in objOldFormatDate) {
        arrNewFormatDate.push(objOldFormatDate[toFormat[i]]);
        continue;
      } else {
        if (objOldFormatDate['YY'] < 30) {
          arrNewFormatDate.push('20' + objOldFormatDate['YY']);
          continue;
        } else {
          arrNewFormatDate.push('19' + objOldFormatDate['YY']);
          continue;
        }
      }
    }
    arrNewFormatDate.push(objOldFormatDate[toFormat[i]]);
  }

  const [, , , separNew] = toFormat;
  const resultingString = arrNewFormatDate.join(separNew);

  return resultingString;
}

module.exports = formatDate;
