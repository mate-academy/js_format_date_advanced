'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DAY_OF_MONTH = 'DD';
  const MONTH_OF_YEAR = 'MM';
  const FOUR_DISITS_CODE_OF_YEAR = 'YYYY';
  const TWO_DISITS_CODE_OF_YEAR = 'YY';
  const FIRST_ITEM_OF_FORMAT_DATE = 0;
  const SECOND_ITEM_OF_FORMAT_DATE = 1;
  const THIRD_ITEM_OF_FORMAT_DATE = 2;
  const NOW_CENTURY = '20';
  const LAST_CENTURY = '19';
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const newArray = [];
  let indexYear;
  let day;
  let month;
  let year;

  function getValue(strDate, Separator, index) {
    const indexOfSeparator1 = date.indexOf(Separator);
    const indexOfSeparator2 = date.indexOf(Separator, indexOfSeparator1 + 1);

    switch (index) {
      case FIRST_ITEM_OF_FORMAT_DATE:
        return strDate.slice(0, indexOfSeparator1);

      case SECOND_ITEM_OF_FORMAT_DATE:
        return strDate.slice(indexOfSeparator1 + 1, indexOfSeparator2);

      case THIRD_ITEM_OF_FORMAT_DATE:
        return strDate.slice(indexOfSeparator2 + 1);
    }
  }

  for (const item of fromFormat) {
    switch (item) {
      case DAY_OF_MONTH:
        const indexDay = fromFormat.indexOf('DD');

        day = getValue(date, oldSeparator, indexDay);

        break;

      case MONTH_OF_YEAR:
        const indexMonth = fromFormat.indexOf('MM');

        month = getValue(date, oldSeparator, indexMonth);

        break;

      case FOUR_DISITS_CODE_OF_YEAR:
        indexYear = fromFormat.indexOf('YYYY');
        year = getValue(date, oldSeparator, indexYear);

        break;

      case TWO_DISITS_CODE_OF_YEAR:
        indexYear = fromFormat.indexOf('YY');
        year = getValue(date, oldSeparator, indexYear);

        year = (+year < 30)
          ? NOW_CENTURY + year
          : LAST_CENTURY + year;

        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case DAY_OF_MONTH:
        newArray[i] = day;
        break;

      case MONTH_OF_YEAR:
        newArray[i] = month;
        break;

      case FOUR_DISITS_CODE_OF_YEAR:
        newArray[i] = year;
        break;

      case TWO_DISITS_CODE_OF_YEAR:
        newArray[i] = year.slice(2);
        break;
    }
  }

  return newArray.join(newSeparator);
}

module.exports = formatDate;
