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
  const oldFormat = {};
  const oldDate = date.split(`${fromFormat[3]}`);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      oldFormat['YY'] = oldDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      oldFormat['YYYY'] = oldDate[i];
    }

    if (fromFormat[i] === 'DD') {
      oldFormat['DD'] = oldDate[i];
    }

    if (fromFormat[i] === 'MM') {
      oldFormat['MM'] = oldDate[i];
    }
  }

  const corectYear = oldFormat['YY'] < 30 ? '20' : '19';

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
        if (oldFormat['YY']) {
          result.push(oldFormat['YY']);
        } else {
          result.push(oldFormat['YYYY'].slice(-2));
        }
        break;
      case 'YYYY':
        if (oldFormat['YY']) {
          result.push(corectYear + oldFormat['YY']);
        } else {
          result.push(oldFormat['YYYY']);
        }
        break;
      case 'MM':
        result.push(oldFormat['MM']);
        break;
      case 'DD':
        result.push(oldFormat['DD']);
        break;
    }
  }

  return result.join(`${toFormat[3]}`);
}

module.exports = formatDate;
