// npm i -s csv-parser
// npm i -s csv-writer
// node changeTimestamps.js

const fs = require('fs');
const csvParse = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'history_business_payloads.csv',
  header: [
    { id: 'loanDuration', title: 'LoanDuration' },
    { id: 'loanPurpose', title: 'LoanPurpose' },
    { id: 'loanAmount', title: 'LoanAmount' },
    { id: 'installmentPercent', title: 'InstallmentPercent' },
    { id: 'acceptedPercent', title: 'AcceptedPercent' },
    { id: 'accepted', title: 'Accepted' },
    { id: 'amountGranted', title: 'AmountGranted' },
    { id: 'transaction_id', title: 'transaction_id' },
    { id: 'timestamp', title: 'timestamp' },
]
});

let newData = [];
fs.createReadStream('history_business_payloads_week.csv')
  .pipe(csvParse())
  .on('data', (row) => {
    for (let i=0; i<2; i++) {
      // 2019-08-29T00:47:18.928046Z

      let min = Math.ceil(1);
      let max = Math.floor(10);
      let month = Math.floor(Math.random() * (max - min + 1) + min);
      if (month % 2 == 0) {
        month = "07";
      } else {
        month = "08";
      }

      min = Math.ceil(1);
      max = Math.floor(31);
      let day = Math.floor(Math.random() * (max - min + 1) + min);
      let intDay = Number(day);
      if (day < 10) day = "0" + day;

      min = Math.ceil(8);
      max = Math.floor(14);
      let hour = Math.floor(Math.random() * (max - min + 1) + min);
      if (hour < 10) hour = "0" + hour;

      min = Math.ceil(0);
      max = Math.floor(59);
      let minute = Math.floor(Math.random() * (max - min + 1) + min);
      if (minute < 10) minute = "0" + minute;

      let timestamp = "2019-" + month + "-" + day + "T" + hour + ":" + minute + ":00.920046Z";

      let amount = Number(row['LoanAmount']);
      min = Math.ceil(1);
      max = Math.floor(10);
      let test = Math.floor(Math.random() * (max - min + 1) + min);

      // if (test % 2 == 0) {
      if (intDay > 12 && intDay < 20) {
        amount = Math.round(amount + (amount / 4));
      // } else {
      //   amount = Math.round(amount - (amount / 2));
      }
      console.log("amount: " + row['LoanAmount'] + " new: " + amount + " day: " + day);

      newData.push({
        loanDuration: row['LoanDuration'],
        loanPurpose: row['LoanPurpose'],
        loanAmount: amount,
        installmentPercent: row['InstallmentPercent'],
        acceptedPercent: row['AcceptedPercent'],
        accepted: row['Accepted'],
        amountGranted: row['AmountGranted'],
        transaction_id: row['transaction_id'],
        timestamp: timestamp,
      });
    }
  })
  .on('end', () => {
    csvWriter
      .writeRecords(newData)
      .then(() => console.log('writing data - done!'));
    console.log('done');
  });
