'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[fromFormat.length - 1]);
  const labels = fromFormat.slice(0, -1);

  const values = {};

  labels.forEach((label, index) => {
    values[label] = parts[index];
  });

  const results = [];

  for (const type of toFormat.slice(0, -1)) {
    if (type === 'YYYY' || type === 'YY') {
      results.push(getYear(type, values));
    } else {
      results.push(values[type]);
    }
  }

  return results.join(toFormat[toFormat.length - 1]);
}

function getYear(type, values) {
  if (
    (type === 'YYYY' && 'YYYY' in values) ||
    (type === 'YY' && 'YY' in values)
  ) {
    return values[type];
  } else if (type === 'YY') {
    return values['YYYY'].slice(2);
  } else {
    const year = values['YY'];

    return Number(year) < 30 ? '20' + year : '19' + year;
  }
}

module.exports = formatDate;
