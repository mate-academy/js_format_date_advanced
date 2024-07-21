'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateParts = date.split(fromSeparator);
  const dateMap = fromFormat.reduce((map, part, index) => {
    map[part] = dateParts[index];

    return map;
  }, {});

  if (dateMap['YYYY'] && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (dateMap['YY'] && toFormat.includes('YYYY')) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  }

  const newDateParts = toFormat.map((part) => dateMap[part]);

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
