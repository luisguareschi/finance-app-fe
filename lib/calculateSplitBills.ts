import {
  BillGroupDetail,
  BillGroupMember,
} from "@/api/baseAppBackendAPI.schemas";

export type CalculateSplitBillsResult = {
  from: BillGroupMember;
  to: BillGroupMember;
  amount: number;
}[];

interface BalanceRecord {
  person: BillGroupMember;
  balance: number;
}

const everyOnePaid = (balanceRecords: BalanceRecord[]) => {
  for (let record of balanceRecords) {
    if (parseInt(record.balance.toFixed(2)) !== 0) {
      return false;
    }
  }
  return true;
};

export const calculateSplitBills = (
  billGroup: BillGroupDetail,
): CalculateSplitBillsResult => {
  const { bills, bill_group_members } = billGroup;

  /* Negative means the person owes money, positive means the person is owed money */
  const balanceRecords: BalanceRecord[] = bill_group_members.map((member) => ({
    person: member,
    balance: 0,
  }));

  // Calculate the balance for each person
  for (let bill of bills) {
    let payerBalance = -parseFloat(bill.amount);
    let numberOfPeoplePayedFor = bill.payed_for_everyone
      ? bill_group_members.length
      : bill.payed_for.length;
    let amountPerPerson = parseFloat(bill.amount) / numberOfPeoplePayedFor;

    for (let record of balanceRecords) {
      if (record.person.id === bill.payed_by.id) {
        record.balance += payerBalance;
      }
      if (
        bill.payed_for.some((person) => person.id === record.person.id) ||
        bill.payed_for_everyone
      ) {
        record.balance += amountPerPerson;
      }
    }
  }

  // Sort the balance records by balance
  balanceRecords.sort((a, b) => a.balance - b.balance);

  // Save the initial balance records
  const initialBalanceRecords: BalanceRecord[] = JSON.parse(
    JSON.stringify(balanceRecords),
  );

  console.log(initialBalanceRecords);

  console.log("------------------Begin------------------");
  let movements: CalculateSplitBillsResult = [];
  while (!everyOnePaid(balanceRecords)) {
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
            let movement: CalculateSplitBillsResult[number] = {
              from: record2.person,
              to: record.person,
              amount: amount,
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
    // Sort the balance records by balance
    balanceRecords.sort((a, b) => a.balance - b.balance);
  }

  console.log("------------------End------------------");
  console.log(balanceRecords);

  return movements;
};
