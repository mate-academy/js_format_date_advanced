'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = [
    {
      name: '',
      value: '',
    },
    {
      name: '',
      value: '',
    },
    {
      name: '',
      value: '',
    },
  ];
  const separator = fromFormat[3];
  const dateObj = {};

  [dateParts[0].name, dateParts[1].name, dateParts[2].name] = fromFormat;

  [dateParts[0].value, dateParts[1].value, dateParts[2].value] =
    date.split(separator);

  for (const part of dateParts) {
    dateObj[part.name] = part.value;
  }

  if (dateObj.YYYY) {
    dateObj.YY = dateObj.YYYY.slice(2);
  } else {
    if (dateObj.YY < 30) {
      dateObj.YYYY = '20' + dateObj.YY;
    } else {
      dateObj.YYYY = '19' + dateObj.YY;
    }
  }

  return [
    dateObj[toFormat[0]],
    dateObj[toFormat[1]],
    dateObj[toFormat[2]],
  ].join(toFormat[3]);
}

module.exports = formatDate;
