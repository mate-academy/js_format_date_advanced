'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [yearKey, monthKey, dayKey, separator] = fromFormat;
  const splittedDate = date.split(separator);

  const oldDateObj = [yearKey, monthKey, dayKey].reduce((acc, key, index) => {
    acc[key] = splittedDate[index];

    return acc;
  }, {});

  const updatedDateObj = changeYearsFormat(oldDateObj, toFormat);

  return toFormat
    .slice(0, -1)
    .map((format) => updatedDateObj[format])
    .join(toFormat[3]);
}

function changeYearsFormat(dateObj, newFormat) {
  const result = { ...dateObj };

  if (result.YY && newFormat.includes('YYYY')) {
    result.YYYY = (+result.YY < 30 ? '20' : '19') + result.YY;
    delete result.YY;
  }

  if (result.YYYY && newFormat.includes('YY')) {
    result.YY = result.YYYY.slice(-2);
    delete result.YYYY;
  }

  return result;
}

module.exports = formatDate;
