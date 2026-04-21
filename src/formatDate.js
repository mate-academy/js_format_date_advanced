'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.at(-1);
  const toSeparator = toFormat.at(-1);

  const dateValues = date.split(fromSeparator);

  const data = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const key = fromFormat[i];

    data[key] = dateValues[i];
  }

  if (data.YYYY && !data.YY) {
    data.YY = data.YYYY.slice(-2);
  } else if (data.YY && !data.YYYY) {
    const yearNum = Number(data.YY);
    const century = yearNum < 30 ? '20' : '19';

    data.YYYY = century + data.YY;
  }

  const resultParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    resultParts.push(data[key]);
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
