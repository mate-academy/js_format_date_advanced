'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const startFormat = [...fromFormat];
  const startSeparator = startFormat.pop();
  const startDate = date.split(startSeparator);

  const resultFormat = [...toFormat];
  const resultSeparator = resultFormat.pop();

  let yearIndex;

  if (startFormat.includes('YY')) {
    yearIndex = startFormat.indexOf('YY');

    if (resultFormat.includes('YYYY')) {
      if (startDate[yearIndex] < 30) {
        startDate[yearIndex] = `20${startDate[yearIndex]}`;
      } else {
        startDate[yearIndex] = `19${startDate[yearIndex]}`;
      }

      startFormat[yearIndex] = 'YYYY';
    }
  }

  if (startFormat.includes('YYYY')) {
    yearIndex = startFormat.indexOf('YYYY');

    if (resultFormat.includes('YY')) {
      startDate[yearIndex] = startDate[yearIndex].slice(-2);

      startFormat[yearIndex] = 'YY';
    }
  }

  const resultDate = [];

  for (let i = 0; i < resultFormat.length; i++) {
    const index = startFormat.indexOf(resultFormat[i]);

    resultDate.push(startDate[index]);
  }

  return resultDate.join(resultSeparator);
}

module.exports = formatDate;
