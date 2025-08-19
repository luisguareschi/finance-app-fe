import { BillGroupDetail } from "@/api/baseAppBackendAPI.schemas";
import { ResponsiveDrawer } from "../common/responsive-drawer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { PenLine } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSplitBillsBillGroupMembersPartialUpdate } from "@/api/split-bills/split-bills";
import toast from "react-hot-toast";
import { QUERYKEYS } from "@/queries/queryKeys";
import Spinner from "../common/spinner";

interface EditPersonFormProps {
  person: BillGroupDetail["bill_group_members"][number];
}

export const EditPersonForm = ({ person }: EditPersonFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>(person.name);
  const queryClient = useQueryClient();
  const { mutate: editPerson, isPending: isEditingPerson } =
    useSplitBillsBillGroupMembersPartialUpdate({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERYKEYS.billGroupDetail],
          });
          toast.success("Person edited successfully");
          setIsOpen(false);
        },
      },
    });

  const handleEditPerson = () => {
    editPerson({
      id: String(person.id),
      data: { name },
    });
  };

  return (
    <ResponsiveDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Edit person"
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="p-0 size-8 text-blue-500 active:bg-blue-800/50 hover:bg-blue-800/50"
          onClick={() => setIsOpen(true)}
        >
          <PenLine className="min-w-5 min-h-5" />
        </Button>
      }
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleEditPerson();
        }}
      >
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="default"
          size="sm"
          className="w-full"
          disabled={!name || name === person.name || isEditingPerson}
          type="submit"
        >
          {isEditingPerson ? <Spinner /> : "Save"}
        </Button>
      </form>
    </ResponsiveDrawer>
  );
};
