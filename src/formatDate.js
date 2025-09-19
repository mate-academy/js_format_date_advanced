function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];

  const parts = [];
  let current = '';
  for (let i = 0; i < date.length; i++) {
    if (date[i] === fromSep) {
      parts[parts.length] = current;
      current = '';
    } else {
      current += date[i];
    }
  }
  parts[parts.length] = current;

  const dateMap = {};
  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yearNum = parseInt(dateMap['YY'], 10);
    if (yearNum < 30) dateMap['YYYY'] = '20' + dateMap['YY'];
    else dateMap['YYYY'] = '19' + dateMap['YY'];
  }

  const result = [];
  for (let i = 0; i < 3; i++) {
    result[result.length] = dateMap[toFormat[i]];
  }

  return result.join(toSep);
}

module.exports = formatDate;
