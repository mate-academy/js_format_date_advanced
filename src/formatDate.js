'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const map = {};
  const splitter = fromFormat[3];
  const partsOfDate = date.split(splitter);
  const neededPartsOfDate = toFormat.length - 1;

  for (let i = 0; i < neededPartsOfDate; i++) {
    const yyNum = Number(partsOfDate[i]);

    map[fromFormat[i]] = partsOfDate[i];

    if (fromFormat[i] === 'YYYY') {
      map['YY'] = partsOfDate[i].slice(-2);
    }

    if (fromFormat[i] === 'YY') {
      if (yyNum < 30) {
        map['YYYY'] = `20${partsOfDate[i]}`;
      }

      if (yyNum >= 30) {
        map['YYYY'] = `19${partsOfDate[i]}`;
      }
    }
  }

  const outputParts = toFormat.slice(0, 3).map((t) => map[t]);

  return outputParts.join(toFormat[3]);
}

module.exports = formatDate;
