'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSpliter = fromFormat[3];
  const newSpliter = toFormat[3];
  const time = {};
  const rezult = [];
  const twentyCentury = '19';
  const twentyOneCentury = '20';
  const halfCentury = '30';

  const oldData = date.split(oldSpliter);

  for (let i = 0; i < 3; i++) {
    time[fromFormat[i]] = oldData[i];
  }

  if (time.YY) {
    if (time.YY < halfCentury) {
      (time.YYYY = twentyOneCentury + time.YY);
    } else {
      (time.YYYY = twentyCentury + time.YY);
    }
  }

  if (time.YYYY) {
    time.YY = time.YYYY.slice(2);
  }

  for (let i = 0; i < 3; i++) {
    rezult.push(time[toFormat[i]]);
  }

  return rezult.join(newSpliter);
}

module.exports = formatDate;
