function formatDateButDieInProcess(date, fromFormat, toFormat) {
  return [
    isYear(toFormat[0])
      ? `${getYear(fromFormat[fromFormat.findIndex(x => isYear(x))],
        toFormat[toFormat.findIndex(x => isYear(x))],
        date.split(fromFormat[3])[fromFormat.findIndex(x => isYear(x))])}`
      : `${date.split(fromFormat[3])[fromFormat.findIndex(x => x === toFormat[0])]}`,

    `${date.split(fromFormat[3])[fromFormat.findIndex(x => x === toFormat[1])]}`,

    isYear(toFormat[2])
      ? `${getYear(fromFormat[fromFormat.findIndex(x => isYear(x))],
        toFormat[toFormat.findIndex(x => isYear(x))],
        date.split(fromFormat[3])[fromFormat.findIndex(x => isYear(x))])}`
      : `${date.split(fromFormat[3])[fromFormat.findIndex(x => x === toFormat[2])]}`,
  ].join(toFormat[3]);
}

function isYear(format) {
  return format === 'YY' || format === 'YYYY';
}

function getYear(oldYearFormat, newYearFormat, oldYear) {
  if (oldYearFormat === newYearFormat) {
    return oldYear;
  }

  if (newYearFormat.length === 2) {
    return oldYear.slice(2);
  }

  if (oldYear >= 30) {
    return 19 + oldYear;
  } else {
    return 20 + oldYear;
  }
}

module.exports = formatDateButDieInProcess;
