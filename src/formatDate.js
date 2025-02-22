'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const data = date.split(fromFormat[fromFormat.length - 1]);

  const firstElem = fromFormat[0];
  const firstElemIndex = searchElementIndex(firstElem, toFormat);
  const secondElem = fromFormat[1];
  const secondElemIndex = searchElementIndex(secondElem, toFormat);
  const thirdElem = fromFormat[2];
  const thirdElemIndex = searchElementIndex(thirdElem, toFormat);

  result[firstElemIndex] = formatOfYear(data[0], toFormat[firstElemIndex]);
  result[secondElemIndex] = formatOfYear(data[1], toFormat[secondElemIndex]);
  result[thirdElemIndex] = formatOfYear(data[2], toFormat[thirdElemIndex]);

  return result.join(toFormat[toFormat.length - 1]);
}

function isYear(value) {
  return value === 'YYYY' || value === 'YY';
}

function searchElementIndex(value, toFormat) {
  if (isYear(value)) {
    const result = toFormat.indexOf('YYYY');

    if (result !== -1) {
      return result;
    }

    return toFormat.indexOf('YY');
  }

  return toFormat.indexOf(value);
}

function formatOfYear(value, format) {
  if (isYear(format)) {
    if (value.length === format.length) {
      return value;
    }

    if (value.length > format.length) {
      return value.slice(2);
    }

    if (value.length < format.length) {
      if (value >= 30) {
        return '19' + value;
      } else {
        return '20' + value;
      }
    }
  }

  return value;
}

module.exports = formatDate;
