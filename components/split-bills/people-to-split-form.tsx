import { BillGroupDetail } from "@/api/baseAppBackendAPI.schemas";
import { Card } from "../ui/card";
import { PenLine, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { AddPersonForm } from "./add-person-form";
import { useSplitBillsBillGroupMembersDestroy } from "@/api/split-bills/split-bills";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import { EditPersonForm } from "./edit-person-form";

interface MemberItemProps {
  member: BillGroupDetail["bill_group_members"][number];
}

const MemberItem = ({ member }: MemberItemProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteMember } = useSplitBillsBillGroupMembersDestroy({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.billGroupDetail],
        });
        toast.success("Member deleted successfully");
      },
    },
  });

  const handleDeleteMember = () => {
    deleteMember({ id: String(member.id) });
  };

  return (
    <Card className="flex justify-between items-center gap-2 w-full p-2">
      <p className="outline-none w-20">{member.name}</p>
      <div className="flex">
        <EditPersonForm person={member} />
        <Button
          variant="ghost"
          size="icon"
          className="p-0 size-8 text-red-500 active:bg-red-800/50 hover:bg-red-800/50"
          onClick={handleDeleteMember}
        >
          <XIcon className="min-w-5 min-h-5" />
        </Button>
      </div>
    </Card>
  );
};

interface PeopleToSplitFormProps {
  billGroup: BillGroupDetail;
}

export const PeopleToSplitForm = ({ billGroup }: PeopleToSplitFormProps) => {
  return (
    <div className="flex flex-col gap-6 md:gap-4">
      <div className="flex justify-between md:justify-start items-center gap-4">
        <h2 className="text-xl font-base text-white">
          People to split with: {billGroup.number_of_members}
        </h2>
        <AddPersonForm billGroup={billGroup} />
      </div>
      <div className="flex gap-2 items-center flex-wrap md:grid md:grid-cols-3 md:max-w-xl">
        {billGroup.bill_group_members.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
        {billGroup.bill_group_members.length === 0 && (
          <p className="text-neutral-400 col-span-3">No members added yet</p>
        )}
      </div>
    </div>
  );
};
