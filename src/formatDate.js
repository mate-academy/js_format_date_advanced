'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 *
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const structuredDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    structuredDate[fromFormat[i]] = dateParts[i];
  }

  if (structuredDate['YY']) {
    const year = parseInt(structuredDate['YY']);

    if (year < 30) {
      structuredDate['YYYY'] = `20${structuredDate['YY']}`;
    } else {
      structuredDate['YYYY'] = `19${structuredDate['YY']}`;
    }
  }

  const result = toFormat.slice(0, -1).map((part) => {
    if (part === 'YYYY') {
      return structuredDate['YYYY'];
    } else if (part === 'YY') {
      return structuredDate['YYYY'].slice(2);
    } else {
      return structuredDate[part];
    }
  });

  // nconsole.log(result.join(toFormat[3]));
  return result.join(toFormat[3]);
}

module.exports = formatDate;
