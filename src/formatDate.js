'use strict';

function formatDate(date, fromFormat, toFormat) {
  let year;
  let day;
  let month;
  const dateArray = date.split(fromFormat[3]);
  const dateResult = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i][0]) {
      case 'D': day = dateArray[i];
        break;
      case 'M': month = dateArray[i];
        break;
      case 'Y': year = dateArray[i];
        break;
      default: break;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i][0]) {
      case 'D': dateResult.push(day);
        break;
      case 'M': dateResult.push(month);
        break;
      case 'Y':
        if (toFormat[i].length > 2) {
          dateResult.push(year.length === 4
            ? year
            : '19' + year
          );
        } else {
          dateResult.push(year.slice(-2));
        }
        break;
      default: break;
    }
  }

  return dateResult.join(toFormat[3]);
}

module.exports = formatDate;
