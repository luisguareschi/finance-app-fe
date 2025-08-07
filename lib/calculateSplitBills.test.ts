import { BillGroupDetail } from "@/api/baseAppBackendAPI.schemas";
import {
  CalculateSplitBillsResult,
  calculateSplitBills,
} from "./calculateSplitBills";

describe("calculateSplitBills", () => {
  it("should return an empty array if there are no bills", () => {
    const billGroup: BillGroupDetail = {
      id: 1,
      name: "Test Group",
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
      bill_group_members: [],
      bills: [],
      number_of_members: "0",
    };
    const result = calculateSplitBills(billGroup);
    expect(result).toEqual([]);
  });

  it("should correctly calculate the split bills", () => {
    const person1 = {
      id: 1,
      name: "Test Member 1",
      created_at: "",
      updated_at: "",
      bill_group: 1,
    };
    const person2 = {
      id: 2,
      name: "Test Member 2",
      created_at: "",
      updated_at: "",
      bill_group: 1,
    };
    const person3 = {
      id: 3,
      name: "Test Member 3",
      created_at: "",
      updated_at: "",
      bill_group: 1,
    };
    const billGroup: BillGroupDetail = {
      id: 1,
      name: "Test Group",
      created_at: "",
      updated_at: "",
      bill_group_members: [person1, person2, person3],
      bills: [
        {
          id: 1,
          bill_group: 1,
          payed_by: person1,
          description: "",
          amount: "100",
          created_at: "",
          updated_at: "",
          payed_for_everyone: false,
          payed_for: [person2, person3],
        },
        {
          id: 2,
          bill_group: 1,
          payed_by: person2,
          description: "",
          amount: "30",
          created_at: "",
          updated_at: "",
          payed_for_everyone: true,
          payed_for: [],
        },
        {
          id: 3,
          bill_group: 1,
          payed_by: person3,
          description: "",
          amount: "15",
          created_at: "",
          updated_at: "",
          payed_for_everyone: false,
          payed_for: [person2, person3],
        },
      ],
      number_of_members: "3",
    };

    const result = calculateSplitBills(billGroup);
    const expectedResult: CalculateSplitBillsResult = [
      {
        from: person2,
        to: person1,
        amount: 37.5,
      },
      {
        from: person3,
        to: person1,
        amount: 52.5,
      },
    ];
    expect(result).toEqual(expectedResult);
  });
});
