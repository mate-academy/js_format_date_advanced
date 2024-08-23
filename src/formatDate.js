'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (typeof date !== 'string' || date.length === 0) {
    return '';
  }

  if (
    !fromFormat ||
    !toFormat ||
    typeof fromFormat !== 'object' ||
    typeof toFormat !== 'object' ||
    !('length' in fromFormat) ||
    !('length' in toFormat)
  ) {
    return '';
  }

  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  if (!fromSeparator || !toSeparator) {
    return '';
  }

  const parts = date.split(fromSeparator);

  if (parts.length !== 3) {
    return '';
  }

  const partsMap = {
    DD: '',
    MM: '',
    YYYY: '',
    YY: '',
  };

  fromFormat.slice(0, 3).forEach((part, index) => {
    if (partsMap.hasOwnProperty(part)) {
      partsMap[part] = parts[index];
    }
  });

  if (partsMap['YY']) {
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
