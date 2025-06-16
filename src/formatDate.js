function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];

  const parts = date.split(fromSep);

  const dateObj = {};
  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    let yearNum = parseInt(dateObj['YY'], 10);

    if (yearNum < 30) {
      dateObj['YYYY'] = '20' + dateObj['YY'].padStart(2, '0');
    } else {
      dateObj['YYYY'] = '19' + dateObj['YY'].padStart(2, '0');
    }
  }

  const newParts = toFormat.slice(0, -1).map(part => dateObj[part]);

  return newParts.join(toSep);
}

module.exports = formatDate;
