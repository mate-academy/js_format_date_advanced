'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const arrDate = date.split(fromSeparator);
  const result = [];

  if (toFormat.join('').length !== fromFormat.join('').length) {
    for (let i = 0; i < 3; i++) {
      const value = fromFormat[i];

      switch (true) {
        case value === 'YY' && +arrDate[i] >= 30:
          arrDate.unshift('19' + arrDate[i]);
          fromFormat.unshift('YYYY');
          break;

        case value === 'YY' && +arrDate[i] < 30:
          arrDate.unshift('20' + arrDate[i]);
          fromFormat.unshift('YYYY');
          break;

        case value.length === 4:
          fromFormat.unshift('YY');
          arrDate.unshift(arrDate[i].slice(2));
          break;
      }
    }
  }

  for (let toIndex = 0; toIndex < toFormat.length - 1; toIndex++) {
    for (let fromIndex = 0; fromIndex < fromFormat.length - 1; fromIndex++) {
      if (toFormat[toIndex] === fromFormat[fromIndex]) {
        result.push(arrDate[fromIndex]);
        break;
      }
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
