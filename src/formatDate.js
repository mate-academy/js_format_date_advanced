'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDateFormat = fromFormat.slice(0, 3);
  const oldSeparator = fromFormat[3];

  const newDateFormat = toFormat.slice(0, 3);
  const newSeparator = toFormat[3];

  const YEAR_MARK = 'Y';
  const MONTH_MARK = 'M';
  const DAY_MARK = 'D';
  const YEAR_LONG = 4;
  const YEAR_SHORT = 2;

  const splitDate = date.split(oldSeparator);

  const dateData = {
    year: {
      index: findPartIndex(newDateFormat, YEAR_MARK),
      value: splitDate[findPartIndex(oldDateFormat, YEAR_MARK)],
      pattern: newDateFormat[findPartIndex(newDateFormat, YEAR_MARK)],
    },

    month: {
      index: findPartIndex(newDateFormat, MONTH_MARK),
      value: splitDate[findPartIndex(oldDateFormat, MONTH_MARK)],
    },

    day: {
      index: findPartIndex(newDateFormat, DAY_MARK),
      value: splitDate[findPartIndex(oldDateFormat, DAY_MARK)],
    },

    dateConstructor(newDate) {
      newDate[this.year.index] = this.year.value;
      newDate[this.month.index] = this.month.value;
      newDate[this.day.index] = this.day.value;

      return newDate;
    },
  };

  switch (dateData.year.value.length) {
    case YEAR_LONG:
      if (dateData.year.pattern.length === YEAR_SHORT) {
        dateData.year.value = dateData.year.value.slice(2);
      }
      break;

    case YEAR_SHORT:
      if (dateData.year.pattern.length === YEAR_LONG) {
        dateData.year.value = +dateData.year.value < 30
          ? '20' + dateData.year.value
          : '19' + dateData.year.value;
      }
      break;
  }

  return dateData.dateConstructor([]).join(newSeparator);
}

function findPartIndex(array, part) {
  return array.findIndex((el) => el.includes(part));
}

module.exports = formatDate;
