'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const dateParts = date.split(separatorFrom);
  const formatParts = [];
  const dateObj = {};

  for (const char of fromFormat) {
    if (char !== '/' && char !== '-' && char !== '.') {
      formatParts.push(char);
    }
  }

  for (let i = 0; i < formatParts.length; i++) {
    dateObj[formatParts[i]] = dateParts[i];
  }

  if ('YYYY' in dateObj && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(2);
  }

  if ('YY' in dateObj && toFormat.includes('YYYY')) {
    const yearNum = parseInt(dateObj['YY']);
    let century = '19';

    if (yearNum < 30) {
      century = '20';
    }

    dateObj['YYYY'] = century + dateObj['YY'];
  }

  const separatorTo =
    toFormat.find((part) => ['-', '.', '/'].includes(part)) || '-';

  const result = [];
  let index = 0;

  for (const part of toFormat) {
    if (part === '/' || part === '-' || part === '.') {
      result.push(part);
    } else {
      result.push(dateObj[part] || '');
    }

    if (
      index < toFormat.length - 1 &&
      part !== '/' &&
      part !== '-' &&
      part !== '.'
    ) {
      result.push(separatorTo);
    }

    index++;
  }

  return result.join('').slice(0, -2);
}

module.exports = formatDate;
