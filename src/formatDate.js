'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const lastIndex = fromFormat.length - 1;
  const splitedDate = date.split(fromFormat[lastIndex]);
  const formatedDate = [];

  for (let i = 0; i < lastIndex; i++) {
    if (toFormat.includes(fromFormat[i])) {
      const indexToAdd = toFormat.indexOf(fromFormat[i]);

      formatedDate[indexToAdd] = splitedDate[i];
    }
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const [index, normalizedDate] = formatYear(
      fromFormat, 'YY', toFormat, 'YYYY', splitedDate
    );

    formatedDate[index] = normalizedDate;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const [index, normalizedDate] = formatYear(
      fromFormat, 'YYYY', toFormat, 'YY', splitedDate
    );

    formatedDate[index] = normalizedDate;
  }

  return formatedDate.join(toFormat[lastIndex]);
}

function formatYear(fromArray, fromDateYear, toArray, toDateYear, date) {
  const fromDate = fromArray.indexOf(fromDateYear);
  const index = toArray.indexOf(toDateYear);
  const newDateNum = date[fromDate];
  let normalizedDate = '';

  if (fromDateYear === 'YY') {
    normalizedDate = newDateNum < 30
      ? `20${newDateNum}`
      : `19${newDateNum}`;
  } else {
    normalizedDate = newDateNum.slice(2);
  }

  return [index, normalizedDate];
}

module.exports = formatDate;
