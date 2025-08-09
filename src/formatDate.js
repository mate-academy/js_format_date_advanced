'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDelimiter = fromFormat[fromFormat.length - 1];
  const toDelimiter = toFormat[toFormat.length - 1];
  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);
  const dateParts = date.split(fromDelimiter);
  const dateMap = {};

  for (let index = 0; index < fromParts.length; index++) {
    const el = fromParts[index];

    dateMap[el] = dateParts[index];
  }

  const newDate = {};

  for (let index = 0; index < toParts.length; index++) {
    const element = toParts[index];

    if (element === 'YY' && !(element in dateMap)) {
      newDate[element] = dateMap.YYYY.slice(2, 4);
      continue;
    }

    if (element === 'YYYY' && !(element in dateMap)) {
      newDate[element] =
        dateMap.YY < 30 ? `20${dateMap.YY}` : `19${dateMap.YY}`;
      continue;
    }
    newDate[element] = dateMap[element];
  }

  const dateFinal = Object.values(newDate).join(toDelimiter);

  return dateFinal;
}

module.exports = formatDate;
