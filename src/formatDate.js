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

  const fromParts = fromFormat.slice(0, fromFormat.length - 1);
  const toParts = toFormat.slice(0, toFormat.length - 1);

  const dateParts = date.split(fromSeparator);

  const partsObj = {};

  fromParts.forEach((part, index) => {
    partsObj[part] = dateParts[index];
  });

  if (partsObj['YYYY']) {
    partsObj['YY'] = partsObj['YYYY'].slice(2);
  }

  if (partsObj['YY'] && !partsObj['YYYY']) {
    const yyNum = Number(partsObj['YY']);

    if (yyNum < 30) {
      partsObj['YYYY'] = '20' + partsObj['YY'];
    } else {
      partsObj['YYYY'] = '19' + partsObj['YY'];
    }
  }

  const newDateParts = toParts.map((part) => {
    if (part === 'YY') {
      if (partsObj['YY']) {
        return partsObj['YY'];
      } else if (partsObj['YYYY']) {
        return partsObj['YYYY'].slice(2);
      } else {
        return '';
      }
    } else if (part === 'YYYY') {
      if (partsObj['YYYY']) {
        return partsObj['YYYY'];
      } else if (partsObj['YY']) {
        const yyNum = Number(partsObj['YY']);

        return yyNum < 30 ? '20' + partsObj['YY'] : '19' + partsObj['YY'];
      } else {
        return '';
      }
    } else {
      return partsObj[part] || '';
    }
  });

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
