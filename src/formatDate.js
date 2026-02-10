'use strict';

function formatDate(date, fromFormat, toFormat) {
  let oldYearIndex;
  let oldMonthIndex;
  let oldDayIndex = 0;
  let newYearIndex;
  let newMonthIndex;
  let newDayIndex = 0;
  let day;
  let month;
  let year = 0;
  const dateUpdated = [];

  const dateArray = date.split(fromFormat[3]);

  const getOldDateIndex = () => {
    for (let i = 0; i <= fromFormat.length; i++) {
      if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
        oldYearIndex = i;
        year = dateArray[oldYearIndex];
      } else if (fromFormat[i] === 'MM') {
        oldMonthIndex = i;
        month = dateArray[oldMonthIndex];
      } else if (fromFormat[i] === 'DD') {
        oldDayIndex = i;
        day = dateArray[oldDayIndex];
      }
    }
  };

  const getNewDateIndex = () => {
    for (let i = 0; i <= toFormat.length; i++) {
      if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
        newYearIndex = i;
        dateUpdated[newYearIndex] = year;
      } else if (toFormat[i] === 'MM') {
        newMonthIndex = i;
        dateUpdated[newMonthIndex] = month;
      } else if (toFormat[i] === 'DD') {
        newDayIndex = i;
        dateUpdated[newDayIndex] = day;
      }
    }
  };

  const updateDate = () => {
    if (dateUpdated[newYearIndex].length === toFormat[newYearIndex].length) {
    } else {
      if (
        dateUpdated[newYearIndex].length === 4 &&
        toFormat[newYearIndex].length === 2
      ) {
        dateUpdated[newYearIndex] = dateUpdated[newYearIndex].slice(2, 4);
      } else if (
        dateUpdated[newYearIndex].length === 2 &&
        toFormat[newYearIndex].length === 4
      ) {
        if (dateUpdated[newYearIndex] < 30) {
          dateUpdated[newYearIndex] = `20${dateUpdated[newYearIndex]}`;
        } else {
          dateUpdated[newYearIndex] = `19${dateUpdated[newYearIndex]}`;
        }
      }
    }
  };

  getOldDateIndex();
  getNewDateIndex();
  updateDate();

  return dateUpdated.join(toFormat[3]);
}

module.exports = formatDate;
