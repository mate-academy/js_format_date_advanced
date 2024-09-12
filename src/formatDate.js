'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const PARTS_OF_DATE = date.split(fromFormat[3]);
  const DATE_OBJECT = {};
  const newDateArray = [...toFormat.slice(0, -1)];

  let yearAndType = null;

  for (let i = 0; i < PARTS_OF_DATE.length; i++) {
    DATE_OBJECT[fromFormat[i]] = PARTS_OF_DATE[i];
  }

  for (let i = 0; i < newDateArray.length; i++) {
    if (DATE_OBJECT[newDateArray[i]]) {
      newDateArray[i] = DATE_OBJECT[newDateArray[i]];
    }
  }

  for (const part of newDateArray) {
    if (part.includes('YY')) {
      yearAndType = [part];
      break;
    }
  }

  if (yearAndType === null) {
    return newDateArray.join(toFormat[3]);
  } else {
    yearAndType[1] = yearAndType[0] === 'YYYY'
      ? DATE_OBJECT['YY']
      : DATE_OBJECT['YYYY'];

    if (yearAndType[0] === 'YYYY') {
      yearAndType[1] = (+yearAndType[1] < 30 ? 20 : 19) + yearAndType[1];
    } else {
      yearAndType[1] = yearAndType[1].slice(2);
    }

    for (let i = 0; i < newDateArray.length; i++) {
      if (newDateArray[i].includes('Y')) {
        newDateArray[i] = yearAndType[1];

        return newDateArray.join(toFormat[3]);
      }
    }
  }
}

module.exports = formatDate;
