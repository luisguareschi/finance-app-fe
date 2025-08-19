import { BillGroupDetail } from "@/api/baseAppBackendAPI.schemas";
import { Button } from "../ui/button";
import { Calculator, Copy, Trash } from "lucide-react";
import { useSplitBillsBillGroupsDestroy } from "@/api/split-bills/split-bills";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import toast from "react-hot-toast";
import {
  calculateSplitBills,
  CalculateSplitBillsResult,
} from "@/lib/calculateSplitBills";
import { useState } from "react";
import { ResponsiveDrawer } from "../common/responsive-drawer";

interface CalculateBillProps {
  billGroup: BillGroupDetail;
}

export const CalculateBill = ({ billGroup }: CalculateBillProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [movements, setMovements] = useState<CalculateSplitBillsResult>([]);
  const { mutate: deleteBillGroup } = useSplitBillsBillGroupsDestroy({
    mutation: {
      onSuccess: () => {
        router.push("/split-bills");
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.billGroupsList],
        });
        toast.success("Bill group deleted");
      },
    },
  });

  const handleDelete = () => {
    deleteBillGroup({ id: String(billGroup.id) });
  };

  const handleCalculate = () => {
    const movements = calculateSplitBills(billGroup);
    setMovements(movements);
  };

  const handleCopy = () => {
    const movementsString = movements
      .map(
        (movement) =>
          `${movement.from.name} ➡ ${movement.to.name} | Amount: ${movement.amount.toFixed(2)} ${billGroup.currency}`,
      )
      .join("\n");
    navigator.clipboard.writeText(`Payments Needed:\n${movementsString}`);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col text-white gap-4 w-full lg:max-w-[350px]">
      <h1 className="text-xl font-base text-white">Actions</h1>
      <div className="flex gap-4 w-full">
        <ResponsiveDrawer
          isOpen={!!movements.length}
          onClose={() => setMovements([])}
          title="Results"
          description="Who owes who how much"
          forceDialog
          trigger={
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleCalculate}
              disabled={billGroup.bills.length === 0}
            >
              <Calculator />
              Calculate
            </Button>
          }
        >
          <div className="flex flex-col gap-2 justify-center items-center sm:items-start">
            {movements.map((movement) => (
              <div key={movement.from.id}>
                {movement.from.name} ➡ {movement.to.name} | Amount:{" "}
                {movement.amount.toFixed(2)} {billGroup.currency}
              </div>
            ))}
            <Button
              variant="secondary"
              className="w-full mt-4"
              onClick={handleCopy}
            >
              <Copy />
              Copy to clipboard
            </Button>
          </div>
        </ResponsiveDrawer>
        <Button
          variant="destructiveText"
          className="w-full"
          onClick={handleDelete}
        >
          <Trash />
          Delete Group
        </Button>
      </div>
    </div>
  );
};
