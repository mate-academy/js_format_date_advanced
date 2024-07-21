'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(separator);
  const newDate = new Array(3).fill('');

  const formatMap = {
    DD: 'day',
    MM: 'month',
    YYYY: 'year',
    YY: 'year',
  };

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const format = fromFormat[i];
    const partType = formatMap[format];
    const partValue = dateParts[i];

    const newIndex = toFormat.findIndex(
      (f, index) => formatMap[f] === partType && index < toFormat.length - 1,
    );

    if (format === 'YYYY' && toFormat[newIndex] === 'YY') {
      newDate[newIndex] = partValue.slice(-2);
    } else if (format === 'YY' && toFormat[newIndex] === 'YYYY') {
      newDate[newIndex] = (+partValue < 30 ? '20' : '19') + partValue;
    } else {
      newDate[newIndex] = partValue;
    }
  }

  return newDate.filter(Boolean).join(newSeparator);
}

module.exports = formatDate;
