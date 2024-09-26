'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const currentSeparator = fromFormat[3];
  const desiredSeparator = toFormat[3];
  const currentFormat = fromFormat.slice(0, 3);
  const desiredFormat = toFormat.slice(0, 3);
  const dateArray = date.split(currentSeparator);
  const day = dateArray[currentFormat.indexOf('DD')];
  const month = dateArray[currentFormat.indexOf('MM')];
  const result = [];
  let year;

  if (currentFormat.includes('YYYY')) {
    year = dateArray[currentFormat.indexOf('YYYY')];
  } else {
    year = dateArray[currentFormat.indexOf('YY')];
  }

  if (currentFormat.includes('YY') && desiredFormat.includes('YYYY')) {
    if (year < 30) {
      year = `20${year}`;
    } else {
      year = `19${year}`;
    }
  }

  if (currentFormat.includes('YYYY') && desiredFormat.includes('YY')) {
    year = year.slice(2);
  }

  for (let i = 0; i < desiredFormat.length; i++) {
    switch (true) {
      case desiredFormat[i] === 'DD':
        result.push(day);
        break;

      case desiredFormat[i] === 'MM':
        result.push(month);
        break;

      case desiredFormat[i] === 'YY' || desiredFormat[i] === 'YYYY':
        result.push(year);
        break;

      default:
        return 'Wrong date';
    }
  }

  return result.join(desiredSeparator);
}

module.exports = formatDate;
