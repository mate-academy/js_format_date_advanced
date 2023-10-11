'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const YEAR_MARKING_LONG_VERSION = 'YYYY';
  const YEAR_MARKING_SHORT_VERSION = 'YY';
  const MONTH_MARKING = 'MM';
  const DAY_MARKING = 'DD';
  const TWENTIETH_CENTURY_MARKING = '19';
  const TWENTIETH_ONE_CENTURY_MARKING = '20';
  const CURRENT_YEAR_WITHOUT_CENTURY
    = +new Date().getFullYear().toString().slice(2);
  const result = [];
  const splitArray = date.split(fromFormat[3]);

  switch (fromFormat[0]) {
    case YEAR_MARKING_SHORT_VERSION:
      if (toFormat[0] === YEAR_MARKING_SHORT_VERSION) {
        result[0] = splitArray[0];
      }

      if (toFormat[1] === YEAR_MARKING_SHORT_VERSION) {
        result[1] = splitArray[0];
      }

      if (toFormat[2] === YEAR_MARKING_SHORT_VERSION) {
        result[2] = splitArray[0];
      }

      if (toFormat[0] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[0] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[0] = TWENTIETH_CENTURY_MARKING + splitArray[0];
        } else {
          result[0] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[0];
        }
      }

      if (toFormat[1] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[0] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[1] = TWENTIETH_CENTURY_MARKING + splitArray[0];
        } else {
          result[1] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[0];
        }
      }

      if (toFormat[2] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[0] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[2] = TWENTIETH_CENTURY_MARKING + splitArray[0];
        } else {
          result[2] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[0];
        }
      }
      break;
    case YEAR_MARKING_LONG_VERSION:
      if (toFormat[0] === YEAR_MARKING_LONG_VERSION) {
        result[0] = splitArray[0];
      }

      if (toFormat[1] === YEAR_MARKING_LONG_VERSION) {
        result[1] = splitArray[0];
      }

      if (toFormat[2] === YEAR_MARKING_LONG_VERSION) {
        result[2] = splitArray[0];
      }

      if (toFormat[0] === YEAR_MARKING_SHORT_VERSION) {
        result[0] = splitArray[0].slice(2);
      }

      if (toFormat[1] === YEAR_MARKING_SHORT_VERSION) {
        result[1] = splitArray[0].slice(2);
      }

      if (toFormat[2] === YEAR_MARKING_SHORT_VERSION) {
        result[2] = splitArray[0].slice(2);
      }
      break;
    case MONTH_MARKING:
      if (toFormat[0] === MONTH_MARKING) {
        result[0] = splitArray[0];
      }

      if (toFormat[1] === MONTH_MARKING) {
        result[1] = splitArray[0];
      }

      if (toFormat[2] === MONTH_MARKING) {
        result[2] = splitArray[0];
      }
      break;
    case DAY_MARKING:
      if (toFormat[0] === DAY_MARKING) {
        result[0] = splitArray[0];
      }

      if (toFormat[1] === DAY_MARKING) {
        result[1] = splitArray[0];
      }

      if (toFormat[2] === DAY_MARKING) {
        result[2] = splitArray[0];
      }
      break;
  }

  switch (fromFormat[1]) {
    case YEAR_MARKING_SHORT_VERSION:
      if (toFormat[0] === YEAR_MARKING_SHORT_VERSION) {
        result[0] = splitArray[1];
      }

      if (toFormat[1] === YEAR_MARKING_SHORT_VERSION) {
        result[1] = splitArray[1];
      }

      if (toFormat[2] === YEAR_MARKING_SHORT_VERSION) {
        result[2] = splitArray[1];
      }

      if (toFormat[0] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[0] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[0] = TWENTIETH_CENTURY_MARKING + splitArray[1];
        } else {
          result[0] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[1];
        }
      }

      if (toFormat[1] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[0] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[1] = TWENTIETH_CENTURY_MARKING + splitArray[1];
        } else {
          result[1] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[1];
        }
      }

      if (toFormat[2] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[0] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[2] = TWENTIETH_CENTURY_MARKING + splitArray[1];
        } else {
          result[2] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[1];
        }
      }
      break;
    case YEAR_MARKING_LONG_VERSION:
      if (toFormat[0] === YEAR_MARKING_LONG_VERSION) {
        result[0] = splitArray[1];
      }

      if (toFormat[1] === YEAR_MARKING_LONG_VERSION) {
        result[1] = splitArray[1];
      }

      if (toFormat[2] === YEAR_MARKING_LONG_VERSION) {
        result[2] = splitArray[1];
      }

      if (toFormat[0] === YEAR_MARKING_SHORT_VERSION) {
        result[0] = splitArray[1].slice(2);
      }

      if (toFormat[1] === YEAR_MARKING_SHORT_VERSION) {
        result[1] = splitArray[1].slice(2);
      }

      if (toFormat[2] === YEAR_MARKING_SHORT_VERSION) {
        result[2] = splitArray[1].slice(2);
      }
      break;
    case MONTH_MARKING:
      if (toFormat[0] === MONTH_MARKING) {
        result[0] = splitArray[1];
      }

      if (toFormat[1] === MONTH_MARKING) {
        result[1] = splitArray[1];
      }

      if (toFormat[2] === MONTH_MARKING) {
        result[2] = splitArray[1];
      }
      break;
    case DAY_MARKING:
      if (toFormat[0] === DAY_MARKING) {
        result[0] = splitArray[1];
      }

      if (toFormat[1] === DAY_MARKING) {
        result[1] = splitArray[1];
      }

      if (toFormat[2] === DAY_MARKING) {
        result[2] = splitArray[1];
      }
      break;
  }

  switch (fromFormat[2]) {
    case YEAR_MARKING_SHORT_VERSION:
      if (toFormat[0] === YEAR_MARKING_SHORT_VERSION) {
        result[0] = splitArray[2];
      }

      if (toFormat[1] === YEAR_MARKING_SHORT_VERSION) {
        result[1] = splitArray[2];
      }

      if (toFormat[2] === YEAR_MARKING_SHORT_VERSION) {
        result[2] = splitArray[2];
      }

      if (toFormat[0] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[2] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[0] = TWENTIETH_CENTURY_MARKING + splitArray[2];
        } else {
          result[0] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[2];
        }
      }

      if (toFormat[1] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[2] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[1] = TWENTIETH_CENTURY_MARKING + splitArray[2];
        } else {
          result[1] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[2];
        }
      }

      if (toFormat[2] === YEAR_MARKING_LONG_VERSION) {
        if (+splitArray[0] > CURRENT_YEAR_WITHOUT_CENTURY) {
          result[2] = TWENTIETH_CENTURY_MARKING + splitArray[2];
        } else {
          result[2] = TWENTIETH_ONE_CENTURY_MARKING + splitArray[2];
        }
      }
      break;
    case YEAR_MARKING_LONG_VERSION:
      if (toFormat[0] === YEAR_MARKING_LONG_VERSION) {
        result[0] = splitArray[2];
      }

      if (toFormat[1] === YEAR_MARKING_LONG_VERSION) {
        result[1] = splitArray[2];
      }

      if (toFormat[2] === YEAR_MARKING_LONG_VERSION) {
        result[2] = splitArray[2];
      }

      if (toFormat[0] === YEAR_MARKING_SHORT_VERSION) {
        result[0] = splitArray[2].slice(2);
      }

      if (toFormat[1] === YEAR_MARKING_SHORT_VERSION) {
        result[1] = splitArray[2].slice(2);
      }

      if (toFormat[2] === YEAR_MARKING_SHORT_VERSION) {
        result[2] = splitArray[2].slice(2);
      }
      break;
    case MONTH_MARKING:
      if (toFormat[0] === MONTH_MARKING) {
        result[0] = splitArray[2];
      }

      if (toFormat[1] === MONTH_MARKING) {
        result[1] = splitArray[2];
      }

      if (toFormat[2] === MONTH_MARKING) {
        result[2] = splitArray[2];
      }
      break;
    case DAY_MARKING:
      if (toFormat[0] === DAY_MARKING) {
        result[0] = splitArray[2];
      }

      if (toFormat[1] === DAY_MARKING) {
        result[1] = splitArray[2];
      }

      if (toFormat[2] === DAY_MARKING) {
        result[2] = splitArray[2];
      }
      break;
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
