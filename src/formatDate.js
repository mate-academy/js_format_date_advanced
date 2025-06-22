'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeperator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const partsDate = date.split(fromSeperator);
  const fromKeys = fromFormat.slice(0, -1);
  const toKeys = toFormat.slice(0, -1);
  const newDate = {};

  for (let i = 0; i < fromKeys.length; i++) {
    newDate[fromKeys[i]] = partsDate[i];
  }

  if (newDate['ГГ'] && !newDate['ГГГГ']) {
    const yy = parseInt(newDate['ГГ'], 10);

    if (yy < 30) {
      newDate['ГГГГ'] = `20${yy.toString().padStart(2, '0')}`;
    } else {
      newDate['ГГГГ'] = '19' + yy.toString();
    }
  } else if (newDate['ГГГГ'] && !newDate['ГГ']) {
    newDate['ГГ'] = newDate['ГГГГ'].slice(-2);
  }

  if (newDate['YY'] && !newDate['YYYY']) {
    const yy = parseInt(newDate['YY'], 10);

    if (yy < 30) {
      newDate['YYYY'] = `20${yy.toString().padStart(2, '0')}`;
    } else {
      newDate['YYYY'] = '19' + yy.toString();
    }
  } else if (newDate['YYYY'] && !newDate['YY']) {
    newDate['YY'] = newDate['YYYY'].slice(-2);
  }

  let result = '';

  for (let i = 0; i < toKeys.length; i++) {
    const key = toKeys[i];

    result += newDate[key];

    if (i < toKeys.length - 1) {
      result += toSeparator;
    }
  }

  return result;
}

module.exports = formatDate;
