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

  const LONG_YEAR_ABBR = 'YYYY';
  const SHORT_YEAR_ABBR = 'YY';

  const dateArray = date.split(oldDelimiter);
  let resultDate = '';
  const resultDateArray = [];
  let yearShortFormat;
  let yearLongFormat;

  if (toFormat.includes(LONG_YEAR_ABBR)
  && (fromFormat.includes(SHORT_YEAR_ABBR))) {
    yearShortFormat = dateArray[fromFormat.indexOf(SHORT_YEAR_ABBR)];
    yearLongFormat = (yearShortFormat > 29 ? '19' : '20') + yearShortFormat;

    dateArray[dateArray.indexOf(yearShortFormat)] = yearLongFormat;
    fromFormat[fromFormat.indexOf(SHORT_YEAR_ABBR)] = LONG_YEAR_ABBR;
  }

  if (toFormat.includes(SHORT_YEAR_ABBR)
  && (fromFormat.includes(LONG_YEAR_ABBR))) {
    yearLongFormat = dateArray[fromFormat.indexOf(LONG_YEAR_ABBR)];
    yearShortFormat = yearLongFormat.slice(2);

    fromFormat[fromFormat.indexOf(LONG_YEAR_ABBR)] = SHORT_YEAR_ABBR;
    dateArray[dateArray.indexOf(yearLongFormat)] = yearShortFormat;
  }

  for (let i = 0; i <= fromFormat.length - 2; i++) {
    const oldPropertyToPut = fromFormat[i];
    const indexToPut = toFormat.indexOf(oldPropertyToPut);

    resultDateArray[indexToPut] = dateArray[i];
  }

  resultDate = resultDateArray.join(newDelimiter);

  return resultDate;
}

module.exports = formatDate;
