'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fF = fromFormat;
  const tF = toFormat;

  let separator = fF[3];
  const arrStartDay = date.split(separator);
  const arrResult = [];
  const objDateInfo = {
    YY: 'YY',
    MM: 'MM',
    DD: 'DD',
    YYYY: 'YYYY',
  };

  for (let i = 0; i < fF.length; i++) {
    if (fF[i] === 'YY') {
      objDateInfo['YY'] = arrStartDay[i];

      if (arrStartDay[i] >= 0 && arrStartDay[i] <= 22) {
        objDateInfo['YYYY'] = 20 + arrStartDay[i];
      }

      if (arrStartDay[i] > 22 && arrStartDay[i] < 99) {
        objDateInfo['YYYY'] = 19 + arrStartDay[i];
      }
    }

    if (fF[i] === 'YYYY') {
      objDateInfo['YYYY'] = arrStartDay[i];
      objDateInfo['YY'] = arrStartDay[i].slice(-2);
    }

    if (fF[i] === 'DD') {
      objDateInfo['DD'] = arrStartDay[i];
    }

    if (fF[i] === 'MM') {
      objDateInfo['MM'] = arrStartDay[i];
    }
  }

  for (const char of tF) {
    for (const key in objDateInfo) {
      if (key === char) {
        arrResult.push(objDateInfo[key]);
      }
    }
  }
  separator = tF.slice(-1);

  const dateResult = arrResult.join(separator);

  return (dateResult);
}

module.exports = formatDate;
