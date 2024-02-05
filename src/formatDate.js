'use strict';

function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateArray = date.split(fromSeparator);
  const year = dateArray[fromFormat.indexOf('YY')]
  || dateArray[fromFormat.indexOf('YYYY')];
  const fromYear = fromFormat.find((str) => str.includes('Y'));
  const toYear = toFormat.find((str) => str.includes('Y'));
  const obj = {
    DD: dateArray[fromFormat.indexOf('DD')],
    MM: dateArray[fromFormat.indexOf('MM')],
    YY: getYearRight(fromYear, toYear, year),
    YYYY: getYearRight(fromYear, toYear, year),
  };

  return toFormat.map((str) => obj[str]).join(toSeparator);
}

function getYearRight(fromYear, toYear, correctNumber) {
  const strTransformation = fromYear + '->' + toYear;

  switch (strTransformation) {
    case 'YYYY->YYYY':
    case 'YY->YY':
      return correctNumber;
    case 'YYYY->YY':
      return correctNumber.slice(2);
    case 'YY->YYYY':
      return correctNumber >= 30 ? '19' + correctNumber : '20' + correctNumber;
  }
}
module.exports = formatDate;
