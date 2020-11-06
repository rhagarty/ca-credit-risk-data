import csv

csvfileIn = open('history_business_payloads_week.csv')
csvfileOut = open('history_business_payloads.csv', 'w')

reader = csv.DictReader(csvfileIn)
writer = csv.DictWriter(csvfileOut, fieldnames = ['LoanDuration', 'LoanPurpose', 'LoanAmount', 'InstallmentPercent', 'AcceptedPercent', 'Accepted', 'AmountGranted', 'transaction_id', 'timestamp'])
writer.writeheader()

for row in reader:
  writer.writerow({
    'LoanDuration': row['LoanDuration'],
    'LoanPurpose': row['LoanPurpose'],
    'LoanAmount': row['LoanAmount'],
    'InstallmentPercent': row['InstallmentPercent'],
    'AcceptedPercent': row['AcceptedPercent'],
    'Accepted': row['Accepted'],
    'AmountGranted': row['AmountGranted'],
    'transaction_id': row['transaction_id'],
    'timestamp': row['timestamp'],    
    })

csvfileIn.close();
csvfileOut.close();