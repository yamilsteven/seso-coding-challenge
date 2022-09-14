"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

const Entries = class {
  constructor(entries) {
    this.array = entries;
  }

  popAsync() {
    return new Promise((resolve, reject) => {
      const entry = this.array.pop();
      if (entry) {
        resolve(entry);
      }
      reject(null);
    });
  }
};

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const entriesAsync = new Entries(logSources);

    let entries = [];

    try {
      for (let b; (b = await entriesAsync.popAsync().then()); ) {
        entries.push(b?.last);
      }
    } catch (error) {}

    entries.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    entries.forEach((entry, index) => {
        printer.print(entry);
    });

    printer.done();

    resolve(console.log("Async sort complete."));
  });
};
