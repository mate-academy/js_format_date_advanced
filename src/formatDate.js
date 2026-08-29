'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDelimiter = fromFormat[3];
  const newDelimiter = toFormat[3];
  const dateParts = date.split(oldDelimiter);

  const parsed = {};

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];

    parsed[key] = dateParts[i];
  }

  let yearYYYY = parsed.YYYY;
  let yearYY = parsed.YY;

  if (yearYYYY === undefined && yearYY !== undefined) {
    const numYY = Number(yearYY);

    yearYYYY = numYY < 30 ? `20${yearYY}` : `19${yearYY}`;
  }

  if (!yearYY && yearYYYY) {
    yearYY = yearYYYY.slice(-2);
  }

  const values = {
    YYYY: yearYYYY,
    YY: yearYY,
    MM: parsed.MM,
    DD: parsed.DD,
  };

  const resultParts = [
    values[toFormat[0]],
    values[toFormat[1]],
    values[toFormat[2]],
  ];

  return resultParts.join(newDelimiter);
}

module.exports = formatDate;
