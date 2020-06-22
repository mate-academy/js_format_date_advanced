
'use strict';

function formatDate(date, fromFormat, toFormat) {
  if (date.includes(fromFormat[3])) {
    const dateSplit = date.split(fromFormat[3]);
    let day = 'DD';
    let monts = 'MM';
    let year = 'YYYY';

    for (let i = 0; i < fromFormat.length; i++) {
      switch (fromFormat[i]) {
        case day: day = dateSplit[i];
          break;
        case monts: monts = dateSplit[i];
          break;
        case year: year = dateSplit[i];
          break;
        default: break;
      };
    };

    for (let i = 0; i < toFormat.length; i++) {
      switch (toFormat[i]) {
        case 'DD': toFormat[i] = day;
          break;
        case 'MM': toFormat[i] = monts;
          break;
        case 'YY' : toFormat[i] = year.slice(2);
          break;
        case 'YYYY': toFormat[i] = year;
          break;
        default: break;
      };
    };

    const finalString = toFormat.slice(0, 3).join(toFormat[3]);

    return finalString;
  };
};

module.exports = formatDate;
