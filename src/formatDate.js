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
  const delimitorFrom = fromFormat[fromFormat.length - 1];
  const delimitotTo = toFormat[toFormat.length - 1];
  const dateObj = {};

  const dateArray = date.split(delimitorFrom);
  const newDateArray = [];

  for (let inDX = 0; inDX < fromFormat.length - 1; inDX++) {
    dateObj[fromFormat[inDX]] = dateArray[inDX];
  }

  for (let inDX = 0; inDX < toFormat.length - 1; inDX++) {
    const property = toFormat[inDX];

    if (!dateObj.hasOwnProperty(property)) {
      if (property === 'YYYY' && dateObj.hasOwnProperty('YY')) {
        let { YY: temp } = dateObj;

        temp = (temp < 30) ? '20' + String(temp) : '19' + String(temp);
        newDateArray.push(temp);
      } else if (property === 'YY' && dateObj.hasOwnProperty('YYYY')) {
        const { YYYY: temp } = dateObj;
        let tempStr = '';

        tempStr = temp.slice(2);
        newDateArray.push(tempStr);
      }
      continue;
    }

    newDateArray.push(dateObj[property]);
  }

  const result = newDateArray.join(delimitotTo);

  return String(result);
  /*
  switch (fromFormat[0]) {
    case 'YY': {
      if (toFormat[0] === 'YYYY') {
        let newFormat;
        const arrayOFoldFormat = date.split(delimitorFrom);

        if (arrayOFoldFormat[0] < 30) {
          arrayOFoldFormat[0] = '20' + String(arrayOFoldFormat[0]);

          newFormat = arrayOFoldFormat.join(delimitotTo);
        } else {
          arrayOFoldFormat[0] = '19' + String(arrayOFoldFormat[0]);

          newFormat = arrayOFoldFormat.join(delimitotTo);
        }

        return String(newFormat.trim());
      }
      break;
    }

    case 'YYYY': {
      if (toFormat[0] === fromFormat[0]) {
        const newFormat = date.split(delimitorFrom).join(delimitotTo);

        return String(newFormat);
      } else {
        if (toFormat[0] === 'DD') {
          const newFormat = date.split(delimitorFrom).reverse();

          const str = newFormat.join(delimitotTo);

          return String(str);
        }
      }
      break;
    }

    case 'MM': {
      let newFormat;

      if (fromFormat[fromFormat.length - 2] === 'YYYY'
      && toFormat[toFormat.length - 2] === 'YY') {
        newFormat = date.split(delimitorFrom);

        const str = newFormat[newFormat.length - 1].slice(2);

        newFormat[newFormat.length - 1] = str;

        newFormat.join(delimitotTo);

        return String(newFormat.join(delimitotTo));
      }

      newFormat = date.split(delimitorFrom).join(delimitotTo);

      return String(newFormat);
    }
  } */
}

module.exports = formatDate;
