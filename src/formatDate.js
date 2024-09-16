'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);

  const indYearFrom = fromFormat.findIndex(el => el[0] === 'Y');

  const year = dateArr[indYearFrom];
  const fromYear = fromFormat[indYearFrom];
  const toYear = toFormat[toFormat.findIndex(el => el[0] === 'Y')];
  const indexOfYearFrom = indYearFrom;

  if (fromYear.length > toYear.length) {
    dateArr[indexOfYearFrom] = year.toString().slice(2);
  }

  if (fromYear.length < toYear.length) {
    dateArr[indexOfYearFrom] = year < 30
      ? '20' + year
      : '19' + year;
  }

  return rearrangeDate(dateArr, fromFormat, toFormat);
}

function rearrangeDate(date, fromFormat, toFormat) {
  const rearrangedDate = [];
  let joinWith;

  for (const el of toFormat) {
    if (!'DYM'.includes(el[0])) {
      joinWith = el;

      continue;
    }

    rearrangedDate.push(
      date[fromFormat.findIndex(fromPart => fromPart[0] === el[0])]
    );
  }

  return rearrangedDate.join(joinWith);
}

module.exports = formatDate;
