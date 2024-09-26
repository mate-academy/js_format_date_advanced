'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DAY_DESCRIPTION = 'DD';
  const MONTH_DESCRIPTION = 'MM';
  const YEAR_DESCRIPTION = 'YY';
  const FULL_YEAR_DESCRIPTION = 'YYYY';
  const INDEX_OF_DEVIDER = 3;

  const newDevider = toFormat[INDEX_OF_DEVIDER];
  const currentDate = date.split(fromFormat[INDEX_OF_DEVIDER]);
  const currentDay = currentDate[fromFormat.indexOf(DAY_DESCRIPTION)];
  const currentMonth = currentDate[fromFormat.indexOf(MONTH_DESCRIPTION)];
  const currentYear = currentDate[fromFormat.indexOf(YEAR_DESCRIPTION)];
  const currentFullYear
    = currentDate[fromFormat.indexOf(FULL_YEAR_DESCRIPTION)];

  const formatedDate = [];

  for (let i = 0; i < INDEX_OF_DEVIDER; i++) {
    switch (toFormat[i]) {
      case DAY_DESCRIPTION:
        formatedDate[i] = currentDay;

        break;

      case MONTH_DESCRIPTION:
        formatedDate[i] = currentMonth;

        break;

      case YEAR_DESCRIPTION:
        if (currentYear) {
          formatedDate[i] = currentYear;

          break;
        }

        formatedDate[i] = currentFullYear.slice(-2);

        break;

      case FULL_YEAR_DESCRIPTION:
        if (currentYear) {
          if (+currentYear < 30) {
            formatedDate[i] = `20${currentYear}`;

            break;
          }

          formatedDate[i] = `19${currentYear}`;

          break;
        }

        formatedDate[i] = currentFullYear;

        break;

      default:
        break;
    }
  }

  return formatedDate.join(newDevider);
}

module.exports = formatDate;
