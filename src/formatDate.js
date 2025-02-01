'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  let separator = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].length === 1) {
      separator = fromFormat[i];
      break;
    }
  }

  const dateSeparated = date.split(separator);

  const oldForm = {};
  let index = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].length > 1) {
      oldForm[fromFormat[i]] = dateSeparated[index++];
    }
  }

  const newForm = {};

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].length === 1) {
      continue;
    }

    if (toFormat[i] === 'YYYY' && oldForm['YY']) {
      newForm[toFormat[i]] =
        (parseInt(oldForm['YY']) < 30 ? '20' : '19') + oldForm['YY'];
    } else if (toFormat[i] === 'YY' && oldForm['YYYY']) {
      newForm[toFormat[i]] = oldForm['YYYY'].slice(-2);
    } else {
      newForm[toFormat[i]] = oldForm[toFormat[i]];
    }
  }

  const newDateArr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].length > 1) {
      newDateArr.push(newForm[toFormat[i]]);
    } else {
      newDateArr.push(toFormat[i]);
    }
  }

  let newSeparator = '';

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].length === 1) {
      newSeparator = toFormat[i];
      break;
    }
  }

  return newDateArr.join(newSeparator);
}

module.exports = formatDate;
