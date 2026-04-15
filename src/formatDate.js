'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat.at(-1));
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const elementOfFormat = fromFormat[i];
    if (elementOfFormat === 'YYYY') {
      dateObj['YY'] = dateArr[i].slice(-2);
    }
    if (elementOfFormat === 'YY' && dateArr[i] < 30) {
      dateObj['YYYY'] = dateArr[i].padStart(4, '20');
    }
    if (elementOfFormat === 'YY' && dateArr[i] >= 30) {
      dateObj['YYYY'] = dateArr[i].padStart(4, '19');
    }
    dateObj[elementOfFormat] = dateArr[i];
  }


  const newDate = toFormat.slice(0, -1)
  .map(key => dateObj[key])
  .join(toFormat.at(-1));

  return newDate;
  }


module.exports = formatDate;
