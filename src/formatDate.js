'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const listData = date.split(fromFormat[fromFormat.length - 1]);
  const workObject = {};
  const checkArray = ['YY', 'YYYY'];
  const resultArray = [];
  const convertArray = (from, to) => {
    switch (to) {
      case 'YY':
        return workObject[from].slice(2);
      case 'YYYY':
        if (workObject[from].length === 2) {
          return Number(workObject[from]) >= 30 ? `19${workObject[from]}` : `20${workObject[from]}`;
        }

        return workObject[from];
    }
  };

  fromFormat.slice(0, -1).forEach((part, index) => {
    workObject[part] = listData[index];
  });

  toFormat.slice(0, -1).forEach((part) => {
    const key = part in workObject ? part : part === 'YYYY' ? 'YY' : 'YYYY';

    if (checkArray.includes(key)) {
      workObject[key] = convertArray(key, part);
    }
    resultArray.push(workObject[key]);
  });

  return resultArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
