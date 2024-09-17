/* eslint-disable no-console */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const newFormatDate = {};
  const dateForRead = date.split(oldSeparator).join('');

  for (const type of 'YMD') {
    let indexOfValue = fromFormat.join('').indexOf(type);

    if (fromFormat[indexOfValue / 2] === 'YYYY') {
      indexOfValue += 2;
    }

    const property = {
      [type]: dateForRead.substr(indexOfValue, 2),
    };

    Object.assign(newFormatDate, property);
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        const millennium = (newFormatDate.Y < 30) ? 20 : 19;

        result[i] = millennium + newFormatDate.Y;
        break;
      case 'YY':
        result[i] = newFormatDate.Y;
        break;
      case 'MM':
        result[i] = newFormatDate.M;
        break;
      case 'DD':
        result[i] = newFormatDate.D;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
