'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const parts = date.split(fromSeparator);

  const partsMap = {
    DD: '',
    MM: '',
    YYYY: '',
    YY: '',
  };

  fromFormat.slice(0, 3).forEach((part, index) => {
    partsMap[part] = parts[index];
  });

  if (
    partsMap['YY'] &&
    toFormat.includes('YYYY') &&
    fromFormat.includes('YY')
  ) {
    const yy = +partsMap['YY'];

    if (yy < 30) {
      partsMap['YYYY'] = '20' + partsMap['YY'];
    } else {
      partsMap['YYYY'] = '19' + partsMap['YY'];
    }
  }

  const resultParts = toFormat.slice(0, 3).map((part) => {
    if (part === 'YY') {
      return partsMap['YYYY'].slice(-2);
    } else if (part === 'YYYY') {
      return partsMap['YYYY'];
    } else {
      return partsMap[part] || '';
    }
  });

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
