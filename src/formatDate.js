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
  const separatorTo = toFormat[3];

  const parts = date.split(separatorFrom);
  const formatMap = {};

  // Крок 1: Побудова formatMap з врахуванням перетворень
  for (let i = 0; i < 3; i++) {
    const label = fromFormat[i];
    let value = parts[i];

    if (label === 'YY') {
      const yy = value.padStart(2, '0');
      const num = Number(yy);

      value = num < 30 ? `20${yy}` : `19${yy}`;
      formatMap['YYYY'] = value;
      formatMap['YY'] = yy;
    } else if (label === 'YYYY') {
      const yyyy = value;

      formatMap['YYYY'] = yyyy;
      formatMap['YY'] = yyyy.slice(-2);
    } else {
      formatMap[label] = value;
    }
  }

  // Крок 2: Побудова результату
  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const label = toFormat[i];

    resultParts.push(formatMap[label]);
  }

  return resultParts.join(separatorTo);
}

module.exports = formatDate;
