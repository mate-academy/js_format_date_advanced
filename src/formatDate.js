'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const [fromYMD, fromSep] = [fromFormat.slice(0, 3), fromFormat[3]];
  const [toYMD, toSep] = [toFormat.slice(0, 3), toFormat[3]];

  const parts = date.split(fromSep);

  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    const key = fromYMD[i];
    let val = parts[i];

    if (key === 'YY') {
      const num = parseInt(val, 10);

      val = num < 30 ? `20${val}`.padStart(4, '0') : `19${val}`;
    }

    dateMap[key] = val;
  }

  if (!dateMap['YYYY'] && dateMap['YY']) {
    dateMap['YYYY'] = dateMap['YY'];
  }

  if (!dateMap['YY'] && dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(2);
  }

  const newParts = toYMD.map((key) => {
    let val = dateMap[key];

    if (key === 'YY' && val.length === 4) {
      val = val.slice(2);
    }

    return val;
  });

  return newParts.join(toSep);
}

module.exports = formatDate;
