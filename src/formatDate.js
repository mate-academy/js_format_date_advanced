'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = date.split(fromFormat[3]);
  const dateNewFormat = [];
  const DAY_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const YEAR_SHORT_FORMAT = 'YY';
  const YEAR_LONG_FORMAT = 'YYYY';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === MONTH_FORMAT) {
      const newIndexMonth = findNewIndex(MONTH_FORMAT);

      dateNewFormat[newIndexMonth] = newDate[i];
    }

    if (
      fromFormat[i] === YEAR_SHORT_FORMAT ||
      fromFormat[i] === YEAR_LONG_FORMAT
    ) {
      const newFormatYear =
        toFormat[i] === YEAR_SHORT_FORMAT
          ? findNewIndex(YEAR_SHORT_FORMAT)
          : findNewIndex(YEAR_LONG_FORMAT);

      const newYear = addYearFormat(newDate[i], newFormatYear[1]);

      dateNewFormat[newFormatYear[0]] = newYear;
    }

    if (fromFormat[i] === DAY_FORMAT) {
      const newIndexDay = findNewIndex(DAY_FORMAT);

      dateNewFormat[newIndexDay] = newDate[i];
    }
  }

  return dateNewFormat.join(toFormat[3]);

  function findNewIndex(name) {
    for (let i = 0; i < toFormat.length; i++) {
      if (
        (name === YEAR_SHORT_FORMAT || name === YEAR_LONG_FORMAT) &&
        (toFormat[i] === YEAR_SHORT_FORMAT || toFormat[i] === YEAR_LONG_FORMAT)
      ) {
        return [i, toFormat[i]];
      }

      if (toFormat[i] === name) {
        return i;
      }
    }
  }

  function addYearFormat(yearOld, yearNew) {
    let newYear = '';
    const NINETEEN_СENTURY = 19;
    const TWENTIETH_CENTURY = 20;
    const TWENTIETH_CENTURY_INDICATOR = 30;

    if (yearOld.length === 4 && yearNew.length === 4) {
      newYear = yearOld;
    }

    if (yearOld.length === 2 && yearNew.length === 2) {
      newYear = yearOld;
    }

    if (yearOld.length === 2 && yearNew.length === 4) {
      if (yearOld < TWENTIETH_CENTURY_INDICATOR) {
        newYear += TWENTIETH_CENTURY + yearOld;
      } else {
        newYear += NINETEEN_СENTURY + yearOld;
      }
    }

    if (yearOld.length === 4 && yearNew.length === 2) {
      newYear = yearOld.slice(2);
    }

    return newYear;
  }
}

module.exports = formatDate;
