'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const array = date.split(fromFormat[3]);
  const oldFormat = fromFormat.slice(0, 3);
  const newFormat = toFormat.slice(0, 3);
  const separator = toFormat[3];
  let result = '';

  for (let i = 0; i < oldFormat.length; i++) {
    if (oldFormat[i] !== newFormat[i]) {
      const index = returnIndex(oldFormat, newFormat, i);

      result += returnString(i, index, oldFormat, newFormat, array);
    } else {
      result += array[i] + ' ';
    }
  }

  return result.trim().split(' ').join(separator);
}

const returnString = (i, index, oldFormat, newFormat, array) => {
  switch (true) {
    case newFormat[i] === 'YYYY' && oldFormat[i] === 'YY':
      return array[index] < 30 ? `20${array[index]}` + ' ' : `19${array[index]}` + ' ';
    case newFormat[i] === 'YY' && oldFormat[i] === 'YYYY':
      return array[index].slice(2) + ' ';
    default:
      return array[index] + ' ';
  }
};

const returnIndex = (oldFormat, newFormat, index) => {
  switch (true) {
    case oldFormat.indexOf(newFormat[index]) !== -1:
      return oldFormat.indexOf(newFormat[index]);
    default:
      return oldFormat.indexOf('YYYY') === -1
        ? oldFormat.indexOf('YY')
        : oldFormat.indexOf('YYYY');
  }
};

module.exports = formatDate;
