"use client";
import { useSplitBillsBillGroupsList } from "@/api/split-bills/split-bills";
import { QUERYKEYS } from "@/queries/queryKeys";
import useStore from "@/lib/useStore";
import { useEffect } from "react";
import { BillGroupItem } from "@/components/split-bills/bill-group-item";
import { CreateGroupForm } from "@/components/split-bills/create-group-form";

const SplitBillsPage = () => {
  const { setNavbarTitle } = useStore();
  const { data: billGroups, isLoading: isLoadingBillGroups } =
    useSplitBillsBillGroupsList({
      query: {
        queryKey: [QUERYKEYS.billGroupsList],
      },
    });

  useEffect(() => {
    setNavbarTitle("Split Bills");
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="font-base text-neutral-300 mb-4">
        Create payment groups to split bills with friends and family.
      </p>
      <div className="flex flex-col gap-4 max-w-md">
        <CreateGroupForm />
        {!isLoadingBillGroups &&
          billGroups?.map((billGroup) => (
            <BillGroupItem key={billGroup.id} billGroup={billGroup} />
          ))}
        {isLoadingBillGroups && (
          <>
            <BillGroupItem isLoading />
            <BillGroupItem isLoading />
          </>
        )}
      </div>
    </div>
  );
};

export default SplitBillsPage;
