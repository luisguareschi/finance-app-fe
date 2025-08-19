import { useEffect, useState } from "react";
import { ResponsiveDrawer } from "../common/responsive-drawer";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CurrencyEnum } from "@/api/baseAppBackendAPI.schemas";
import { useSplitBillsBillGroupsCreate } from "@/api/split-bills/split-bills";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import Spinner from "../common/spinner";

interface CreateGroupForm {
  name: string;
  currency: CurrencyEnum;
}

const initialForm: CreateGroupForm = {
  name: "",
  currency: CurrencyEnum.USD,
};

export const CreateGroupForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<CreateGroupForm>(initialForm);
  const { mutate: createGroup, isPending: isCreatingGroup } =
    useSplitBillsBillGroupsCreate({
      mutation: {
        onSuccess: (data) => {
          setIsOpen(false);
          queryClient.invalidateQueries({
            queryKey: [QUERYKEYS.billGroupsList],
          });
          toast.success("Group created");
          router.push(`/split-bills/${data.id}`);
        },
      },
    });

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

  const handleCreate = () => {
    createGroup({
      data: {
        name: form.name,
        currency: form.currency,
      },
    });
  };

  const isFormValid = form.name.length > 0 && !!form.currency;

  return (
    <ResponsiveDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Create Group"
      description="Enter the details of the group you want to create."
      trigger={
        <Button className="mb-4" onClick={() => setIsOpen(true)}>
          <Plus />
          Create new group
        </Button>
      }
    >
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Label className="text-neutral-200">Group Name</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Group Name"
            className="bg-neutral-800 py-4 border border-neutral-700 h-[42px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Currency</Label>
          <Select
            value={form.currency}
            onValueChange={(value) =>
              setForm({ ...form, currency: value as CurrencyEnum })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={CurrencyEnum.USD}>
                {CurrencyEnum.USD}
              </SelectItem>
              <SelectItem value={CurrencyEnum.EUR}>
                {CurrencyEnum.EUR}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3 mt-4 md:col-span-2 md:justify-end">
          <Button
            variant="ghost"
            className="md:w-fit w-full"
            onClick={() => setIsOpen(false)}
            disabled={isCreatingGroup}
          >
            Cancel
          </Button>
          <Button
            className="md:w-fit w-full"
            onClick={handleCreate}
            disabled={!isFormValid || isCreatingGroup}
          >
            {isCreatingGroup ? <Spinner /> : "Create Group"}
          </Button>
        </div>
      </div>
    </ResponsiveDrawer>
  );
};
