'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDevider = fromFormat[3];
  const toDevider = toFormat[3];

  const dateValues = date.split(fromDevider);

  const objectDate = {};

  fromFormat.forEach((key, value) => {
    objectDate[key] = dateValues[value];
  });

  if (toFormat.includes('YY')) {
    objectDate['YY'] = objectDate['YYYY'].slice(2);
  } else if (objectDate['YY'] && toFormat.includes('YYYY')) {
    objectDate['YYYY'] =
      objectDate['YY'] < 30 ? '20' + objectDate['YY'] : '19' + objectDate['YY'];
  }

  const toDate = toFormat
    .slice(0, 3)
    .map((key) => objectDate[key])
    .join(toDevider);

  return toDate;
}

module.exports = formatDate;
