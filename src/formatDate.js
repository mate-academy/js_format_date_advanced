/* eslint-disable no-console */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplitted = date.split(fromFormat[3]);
  const newDate = [];
  let oldDayPosition = 0;
  let newDayPosition = 0;
  let oldMonthPosition = 0;
  let newMonthPosition = 0;
  let oldYearPosition = 0;
  let newYearPosition = 0;

  // Loop that gets the position of the day, the month and the year
  for (let p = 0; p < toFormat.length; p++) {
    // Get the date positions for the old format
    if (fromFormat[p] === 'DD') {
      oldDayPosition = p;
    } else if (fromFormat[p] === 'MM') {
      oldMonthPosition = p;
    } else if (fromFormat[p] === 'YY' || fromFormat[p] === 'YYYY') {
      oldYearPosition = p;
    }

    // Get the date positions for the new format
    if (toFormat[p] === 'DD') {
      newDayPosition = p;
    } else if (toFormat[p] === 'MM') {
      newMonthPosition = p;
    } else if (toFormat[p] === 'YY' || toFormat[p] === 'YYYY') {
      newYearPosition = p;
    }
  }

  // Putting the year in the rigth format if the position is 0
  if (oldYearPosition === 0 && fromFormat[0] === 'YY') {
    if (toFormat[newYearPosition] === 'YY') {
      newDate[newYearPosition] = dateSplitted[oldYearPosition];
    } else if (toFormat[newYearPosition] === 'YYYY') {
      if (Number(dateSplitted[oldYearPosition]) < 30) {
        newDate[newYearPosition] = '20' + dateSplitted[oldYearPosition];
      } else {
        newDate[newYearPosition] = '19' + dateSplitted[oldYearPosition];
      }

      // Taking the day in the rigth format and position from the date
      newDate[newDayPosition] = dateSplitted[oldDayPosition];

      // Taking the month in the rigth format and position from the date
      newDate[newMonthPosition] = dateSplitted[oldMonthPosition];
    }
  } else if (oldYearPosition === 0 && fromFormat[0] === 'YYYY') {
    if (toFormat[newYearPosition] === 'YY') {
      newDate[newYearPosition] = dateSplitted[oldYearPosition].slice(2, 4);
    } else if (toFormat[newYearPosition] === 'YYYY') {
      newDate[newYearPosition] = dateSplitted[oldYearPosition];
    }

    // Taking the day in the rigth format and position from the date
    newDate[newDayPosition] = dateSplitted[oldDayPosition];

    // Taking the month in the rigth format and position from the date
    newDate[newMonthPosition] = dateSplitted[oldMonthPosition];
  }

  // -----------------------------------------------------------------------

  // Putting the year in the rigth format if the position is 1
  if (oldYearPosition === 1 && fromFormat[1] === 'YY') {
    if (toFormat[newYearPosition] === 'YY') {
      newDate[newYearPosition] = dateSplitted[oldYearPosition];
    } else if (toFormat[newYearPosition] === 'YYYY') {
      if (Number(dateSplitted[oldYearPosition]) < 30) {
        newDate[newYearPosition] = '19' + dateSplitted[oldYearPosition];
      } else {
        newDate[newYearPosition] = '20' + dateSplitted[oldYearPosition];
      }

      // Taking the day in the rigth format and position from the date
      newDate[newDayPosition] = dateSplitted[oldDayPosition];

      // Taking the month in the rigth format and position from the date
      newDate[newMonthPosition] = dateSplitted[oldMonthPosition];
    }
  } else if (oldYearPosition === 1 && fromFormat[1] === 'YYYY') {
    if (toFormat[newYearPosition] === 'YY') {
      newDate[newYearPosition] = dateSplitted[oldYearPosition].slice(2, 4);
    } else if (toFormat[newYearPosition] === 'YYYY') {
      newDate[newYearPosition] = dateSplitted[oldYearPosition];
    }

    // Taking the day in the rigth format and position from the date
    newDate[newDayPosition] = dateSplitted[oldDayPosition];

    // Taking the month in the rigth format and position from the date
    newDate[newMonthPosition] = dateSplitted[oldMonthPosition];
  }

  // -----------------------------------------------------------------------

  // Putting the year in the rigth format if the position is 2
  if (oldYearPosition === 2 && fromFormat[2] === 'YY') {
    if (toFormat[newYearPosition] === 'YY') {
      newDate[newYearPosition] = dateSplitted[2];
    } else if (toFormat[newYearPosition] === 'YYYY') {
      if (Number(dateSplitted[oldYearPosition]) < 30) {
        newDate[newYearPosition] = '19' + dateSplitted[2];
      } else {
        newDate[newYearPosition] = '20' + dateSplitted[2];
      }

      // Taking the day in the rigth format and position from the date
      newDate[newDayPosition] = dateSplitted[oldDayPosition];

      // Taking the month in the rigth format and position from the date
      newDate[newMonthPosition] = dateSplitted[oldMonthPosition];
    }
  } else if (oldYearPosition === 2 && fromFormat[2] === 'YYYY') {
    if (toFormat[newYearPosition] === 'YY') {
      newDate[newYearPosition] = dateSplitted[oldYearPosition].slice(2, 4);
    } else if (toFormat[newYearPosition] === 'YYYY') {
      newDate[newYearPosition] = dateSplitted[oldYearPosition];
    }

    // Taking the day in the rigth format and position from the date
    newDate[newDayPosition] = dateSplitted[oldDayPosition];

    // Taking the month in the rigth format and position from the date
    newDate[newMonthPosition] = dateSplitted[oldMonthPosition];
  }

  let dateResult = '';

  if (toFormat[newYearPosition].length === 2) {
    dateResult = newDate.join(toFormat[3]).slice(0, 8);
  } else if (toFormat[newYearPosition].length === 4) {
    dateResult = newDate.join(toFormat[3]).slice(0, 10);
  }

  return dateResult;
}

module.exports = formatDate;
