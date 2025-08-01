"use client";
import { useSplitBillsBillGroupsRetrieve } from "@/api/split-bills/split-bills";
import useStore from "@/lib/useStore";
import { QUERYKEYS } from "@/queries/queryKeys";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const SplitBillsDetailPage = () => {
  const { id } = useParams();
  const { setNavbarTitle } = useStore();
  const { data: billGroup } = useSplitBillsBillGroupsRetrieve(id as string, {
    query: {
      queryKey: [QUERYKEYS.billGroupDetail, id],
    },
  });

  useEffect(() => {
    if (billGroup) {
      setNavbarTitle(billGroup.name);
    }
  }, [billGroup?.name]);

  return (
    <div className="text-white">
      <h1>Split Bills id {id}</h1>
    </div>
  );
};

export default SplitBillsDetailPage;
