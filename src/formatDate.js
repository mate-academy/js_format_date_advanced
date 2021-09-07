'use strict';
/*
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const arrayDate = date.split(fromFormat[3]);
  const dataFromObj = {};

  for (let i = 0; i < 3; i++) {
    dataFromObj[fromFormat[i]] = arrayDate[i];
  }

  const retDate = [...toFormat].slice(0, 3);

  if (dataFromObj.hasOwnProperty('YY') && (toFormat.includes('YYYY'))) {
    const year = dataFromObj.YY;

    delete dataFromObj.YY;

    if (year < 30) {
      dataFromObj.YYYY = `20${year}`;
    } else {
      dataFromObj.YYYY = `19${year}`;
    }
  }

  if (dataFromObj.hasOwnProperty('YYYY') && (toFormat.includes('YY'))) {
    const year = dataFromObj.YYYY.slice(2);

    delete dataFromObj.YYYY;
    dataFromObj.YY = `${year}`;
  }

  for (let i = 0; i < 3; i++) {
    retDate[i] = dataFromObj[retDate[i]];
  }

  return retDate.join(toFormat[3]);
}

module.exports = formatDate;
