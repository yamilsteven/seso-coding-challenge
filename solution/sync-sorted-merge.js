"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  let entries = [];

  for (let entry; (entry = logSources.pop());) {
      entries.push(entry?.last);
  }

  entries.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  });

  entries.forEach((entry, index) => {
      printer.print(entry);
  });

  printer.done();
  
  return console.log("Sync sort complete.");
};
