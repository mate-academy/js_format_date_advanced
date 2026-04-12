'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (!toFormat[3]) {
    throw new Error('Invalid output format');
  }

  const separator = fromFormat[3];
  const parts = date.trim().split(separator);
  const keys = fromFormat.slice(0, 3);
  const dateParts = {};

  if (parts.length !== 3) {
    throw new Error('Invalid date format');
  }

  for (let i = 0; i < keys.length; i++) {
    dateParts[keys[i]] = parts[i].trim();
  }

  function getValue(key) {
    if (key === 'YYYY') {
      if (dateParts.YYYY) {
        return String(dateParts.YYYY).padStart(4, '0');
      }

      if (dateParts.YY) {
        return yyToYYYY(dateParts.YY);
      }
      throw new Error('Missing year value for YYYY');
    }

    if (key === 'YY') {
      if (dateParts.YY) {
        return pad2(dateParts.YY);
      }

      if (dateParts.YYYY) {
        return yyyyToYY(dateParts.YYYY);
      }
      throw new Error('Missing year value for YY');
    }

    if (key === 'DD' || key === 'MM') {
      if (!dateParts[key]) {
        throw new Error(`Missing value for ${key}`);
      }

      return pad2(dateParts[key]);
    }
    throw new Error(`Unsupported format key: ${key}`);
  }

  function pad2(s) {
    return String(s || '').padStart(2, '0');
  }

  function yyyyToYY(yyyy) {
    return String(yyyy).slice(-2).padStart(2, '0');
  }

  function yyToYYYY(yy) {
    const y = pad2(yy);
    let prefix;

    if (Number(y) < 30) {
      prefix = '20';
    } else {
      prefix = '19';
    }

    return prefix + y;
  }

  const outParts = toFormat.slice(0, 3).map((k) => getValue(k));

  return outParts.join(toFormat[3]);
}

module.exports = formatDate;
