interface person {
  name: string;
  id: string;
}

interface transaction {
  payerId: string;
  personsIds: string[];
  amount: number;
  description: string;
  id: string;
}

interface movement {
  from: string;
  to: string;
  amount: number | string;
}

const everyonePaid = (balanceRecords: any) => {
  for (let record of balanceRecords) {
    if (parseInt(record.balance.toFixed(2)) !== 0) {
      return false;
    }
  }
  return true;
};

const splitTransactions = (persons: person[], transactions: transaction[]) => {
  // (-) es que te deben plata y (+) es que debes plata
  const balanceRecords = persons.map((person) => {
    return {
      personId: person.id,
      personName: person.name,
      balance: 0,
    };
  });

  // calculate balance for each person
  for (let transaction of transactions) {
    let payerBalance = -transaction.amount;
    let amountPerPerson = transaction.amount / transaction.personsIds.length;
    for (let record of balanceRecords) {
      if (record.personId === transaction.payerId) {
        record.balance += payerBalance;
      }
      if (transaction.personsIds.includes(record.personId)) {
        record.balance += amountPerPerson;
      }
    }
  }

  // sort balance records by balance
  balanceRecords.sort((a, b) => {
    return a.balance - b.balance;
  });

  const initialBalanceRecords = JSON.parse(JSON.stringify(balanceRecords));

  console.log(initialBalanceRecords);

  // console.log the actions needed to balance the account
  console.log("------------------Begin------------------");
  let movements = [];
  while (!everyonePaid(balanceRecords)) {
    for (let index in balanceRecords) {
      let record = balanceRecords[index];
      if (record.balance < 0) {
        for (let index2 in balanceRecords) {
          if (index2 <= index) {
            continue;
          }
          let record2 = balanceRecords[index2];
          if (record2.balance > 0) {
            let amount = Math.min(-record.balance, record2.balance);
            record.balance += amount;
            record2.balance -= amount;
            let movement: movement = {
              from: record2.personName,
              to: record.personName,
              amount: amount.toFixed(2),
            };
            if (amount === 0) {
              continue;
            }
            console.log(movement);
            movements.push(movement);
          }
        }
      }
    }
    // sort balance records by balance
    balanceRecords.sort((a, b) => {
      return a.balance - b.balance;
    });
  }
  console.log("------------------End------------------");
  console.log(balanceRecords);

  return movements;
};

export default splitTransactions;
