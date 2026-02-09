'use strict';

function formatDate(date, fromFormat, toFormat) {
  const [oldPart1, , oldPart3] = fromFormat;
  const [newPart1, , newPart3] = toFormat;
  let oldYearIndex = '';
  let newYearIndex = '';
  let year = '';
  let month = '';
  let oldDayIndex = '';
  const dateArray = date.split(fromFormat[3]);
  const dateUpdated = [];

  const getDateIndex = () => {
    if (oldPart1 === 'YYYY' || oldPart1 === 'YY') {
      oldYearIndex = 0;
      oldDayIndex = 2;
      month = 1;
    } else if (oldPart3 === 'YYYY' || oldPart3 === 'YY') {
      oldYearIndex = 2;
      oldDayIndex = 0;
      month = 1;
    } else {
      oldYearIndex = 1;

      if (oldPart1 === 'DD') {
        oldDayIndex = 0;
        month = 2;
      } else {
        oldDayIndex = 2;
        month = 0;
      }
    }
  };

  const setDateIndex = () => {
    if (newPart1 === 'YYYY' || newPart1 === 'YY') {
      newYearIndex = 0;
      dateUpdated[2] = dateArray[oldDayIndex];
      dateUpdated[1] = dateArray[month];
    } else {
      newYearIndex = 2;
      dateUpdated[0] = dateArray[oldDayIndex];
      dateUpdated[1] = dateArray[month];
    }

    if (fromFormat[oldYearIndex].length === 4) {
      if (toFormat[newYearIndex].length === 2) {
        year = dateArray[oldYearIndex].slice(2, 4);
        dateUpdated[newYearIndex] = year;
      } else {
        year = dateArray[oldYearIndex];
        dateUpdated[newYearIndex] = year;
      }
    } else {
      if (toFormat[newYearIndex].length === 4) {
        if (dateArray[oldYearIndex] < 30) {
          year = `20${dateArray[oldYearIndex]}`;
          dateUpdated[newYearIndex] = year;
        } else {
          year = `19${dateArray[oldYearIndex]}`;
          dateUpdated[newYearIndex] = year;
        }
      }
    }
  };

  getDateIndex(oldPart1, oldPart3);
  setDateIndex(newPart1, newPart3);

  return dateUpdated.join(toFormat[3]);
}

module.exports = formatDate;
