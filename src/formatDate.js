'use strict';

function formatDate(date, fromFormat, toFormat) {
  const dataArray = date.split(fromFormat[3]);
  const objFrom = {};
  const objTo = {};
  let year;
  let yearDate;

  for (let i = 0; i < dataArray.length; i++) {
    objFrom[fromFormat[i]] = dataArray[i];

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = fromFormat[i];
      yearDate = dataArray[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      if (toFormat[i].length > year.length) {
        if (yearDate < 30) {
          objFrom[toFormat[i]] = `20${yearDate}`;
        } else {
          objFrom[toFormat[i]] = `19${yearDate}`;
        }
      }

      if (toFormat[i].length < year.length) {
        objFrom[toFormat[i]] = yearDate.slice(2);
      }
    }
    objTo[toFormat[i]] = objFrom[toFormat[i]];
  }

  return Object.values(objTo).join(toFormat[3]);
}

module.exports = formatDate;
