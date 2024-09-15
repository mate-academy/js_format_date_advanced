'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {
    get YYYY() {
      return this.year;
    },
    set YYYY(year) {
      this.year = year;
    },
    get YY() {
      return this.year.slice(2);
    },
    set YY(year) {
      if (Number.parseInt(year) < 30) {
        this.year = `20${year}`;
      }

      if (Number.parseInt(year) >= 30) {
        this.year = `19${year}`;
      }
    },
    MM: null,
    DD: null,
  };

  const [
    leftUnitFrom,
    middleUnitFrom,
    rightUnitFrom,
    separatorFrom,
  ] = fromFormat;

  const [
    leftValue,
    middleValue,
    rightValue,
  ] = date.split(separatorFrom);

  dateObject[leftUnitFrom] = leftValue;
  dateObject[middleUnitFrom] = middleValue;
  dateObject[rightUnitFrom] = rightValue;

  const [
    leftUnitTo,
    middleUnitTo,
    rightUnitTo,
    separatorTo,
  ] = toFormat;

  return [
    dateObject[leftUnitTo],
    dateObject[middleUnitTo],
    dateObject[rightUnitTo],
  ].join(separatorTo);
}

module.exports = formatDate;
