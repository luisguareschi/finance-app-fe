"use client";
import { useSplitBillsBillGroupsRetrieve } from "@/api/split-bills/split-bills";
import { PeopleToSplitForm } from "@/components/split-bills/people-to-split-form";
import { BillsForm } from "@/components/split-bills/bills-form";
import useStore from "@/lib/useStore";
import { QUERYKEYS } from "@/queries/queryKeys";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { CalculateBill } from "@/components/split-bills/calculate-bill";

const SplitBillsDetailPage = () => {
  const { id } = useParams();
  const { setNavbarConfig } = useStore();
  const { data: billGroup, isLoading: isLoadingBillGroup } =
    useSplitBillsBillGroupsRetrieve(id as string, {
      query: {
        queryKey: [QUERYKEYS.billGroupDetail, id],
      },
    });

  useEffect(() => {
    if (billGroup) {
      setNavbarConfig({
        title: billGroup.name,
        backButton: true,
      });
    }
  }, [billGroup?.name]);

  if (isLoadingBillGroup || !billGroup) {
    return <div className="flex text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 pb-20">
      <p className="text-neutral-400">
        Manage people and bills in this group. Add or remove members, track
        expenses, and keep balances fair.
      </p>
      <CalculateBill billGroup={billGroup} />
      <div className="flex flex-col gap-8 lg:flex-row">
        <PeopleToSplitForm billGroup={billGroup} />
        <BillsForm billGroup={billGroup} />
      </div>
    </div>
  );
};

export default SplitBillsDetailPage;
