'use strict';

function formatDate(date, fromFormat, toFormat) {
  const sepatorOld = fromFormat[3];
  const sepatorNew = toFormat[3];
  const dateSplitOld = date.split(sepatorOld);
  const dateSplitNew = [];
  let day;
  let month;
  let year;
  let result = '';

  for (let i = 0; i < dateSplitOld.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateSplitOld[i];
    } else if (fromFormat[i] === 'MM') {
      month = dateSplitOld[i];
    } else if (fromFormat[i] === 'YY' && toFormat[i] === 'YYYY') {
      if (dateSplitOld[i] < 30) {
        year = '20' + dateSplitOld[i];
      } else {
        year = '19' + dateSplitOld[i];
      }
    } else if (fromFormat[i] === 'YYYY' && toFormat[i] === 'YY') {
      year = dateSplitOld[i].slice(2);
    } else {
      year = dateSplitOld[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      dateSplitNew[i] = day;
    } else if (toFormat[i] === 'MM') {
      dateSplitNew[i] = month;
    } else {
      dateSplitNew[i] = year;
    }
  }

  result = dateSplitNew.join(sepatorNew);

  return result;
}

module.exports = formatDate;
