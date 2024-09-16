'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR = fromFormat[fromFormat.length - 1];
  const JOINER = toFormat[toFormat.length - 1];
  const DATEPARTS = date.split(SEPARATOR);

  while (DATEPARTS.length > 1 && DATEPARTS[DATEPARTS.length - 1] === '') {
    DATEPARTS.pop();
  }

  const DATEMAP = {};

  fromFormat.forEach((part, index) => {
    DATEMAP[part] = DATEPARTS[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    DATEMAP['YY'] = DATEMAP['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const FULLYEAR
    = parseInt(DATEMAP['YY']) < 30
      ? '20' + DATEMAP['YY']
      : '19' + DATEMAP['YY'];

    DATEMAP['YYYY'] = FULLYEAR;
  }

  const FORMATTEDDATE = toFormat.map((part) => DATEMAP[part]);

  return FORMATTEDDATE.slice(0, -1).join(JOINER);
}

module.exports = formatDate;
