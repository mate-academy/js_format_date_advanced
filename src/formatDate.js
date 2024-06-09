'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const config = {};

function formatDate(date, fromFormat, toFormat) {
  const divider = fromFormat[3];
  const dateParts = date.split(divider);

  for (let i = 0; i < 3; i++) {
    const formatPart = fromFormat[i];
    const datePart = dateParts[i];

    if (formatPart === 'YYYY') {
      config.YY = datePart.slice(2);
    }

    if (formatPart === 'YY') {
      config.YYYY = datePart < 30 ? `20${datePart}` : `19${datePart}`;
    }

    config[fromFormat[i]] = dateParts[i];
  }

  return Array.from({ length: 3 }, (_v, idx) => config[toFormat[idx]]).join(
    toFormat[3],
  );
}

module.exports = formatDate;
