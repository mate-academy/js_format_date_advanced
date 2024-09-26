'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const start = [];
  let count = 0;
  const newDate = getDate(date);

  for (let i = 0; i < newDate.length; i++) {
    start.push([fromFormat[i], newDate[i]]);
  }

  while (count < 3) {
    let index = fromFormat.findIndex((el) => {
      return el === toFormat[count];
    });

    if (index === -1) {
      if (toFormat.includes('YY')) {
        index = fromFormat.indexOf('YYYY');
        newDate[count] = (start[index][1]).slice(2, 4);
      } else {
        index = fromFormat.indexOf('YY');

        if (start[index][1] >= 30) {
          newDate[count] = '19' + start[index][1];
        } else {
          newDate[count] = '20' + start[index][1];
        }
      }
    } else {
      newDate[count] = start[index][1];
    }

    count++;
  };

  return newDate.join(toFormat[3]);
}

function getDate(date) {
  let newDate = [];

  if (date.length === 10 && Number(date[2])) {
    newDate = date.split(date[4]);
  } else {
    newDate = date.split(date[2]);
  }

  return newDate;
}

module.exports = formatDate;
