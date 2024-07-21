'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const dateParts = date.split(separator);
  const newDate = ['', '', ''];

  const formatMap = {
    DD: 'день',
    MM: 'місяць',
    YYYY: 'рік',
    YY: 'рік',
  };

  for (let i = 0; i < fromFormat.length; i++) {
    const format = fromFormat[i];
    const partType = formatMap[format];
    const partValue = dateParts[i];

    let newIndex = -1;

    for (let j = 0; j < toFormat.length; j++) {
      if (formatMap[toFormat[j]] === partType) {
        newIndex = j;
        break;
      }
    }

    if (format === 'YYYY' && toFormat[newIndex] === 'YY') {
      newDate[newIndex] = partValue.slice(-2);
    } else if (format === 'YY' && toFormat[newIndex] === 'YYYY') {
      newDate[newIndex] = (+partValue < 30 ? '20' : '19') + partValue;
    } else {
      newDate[newIndex] = partValue;
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
