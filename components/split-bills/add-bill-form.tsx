import { useEffect, useState } from "react";
import { ResponsiveDrawer } from "../common/responsive-drawer";
import { Button } from "../ui/button";
import { BillGroupDetail } from "@/api/baseAppBackendAPI.schemas";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MultiSelect } from "../ui/multi-select";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useSplitBillsBillsCreate } from "@/api/split-bills/split-bills";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";

interface Form {
  payed_by: string;
  payed_for: string[];
  amount?: number;
  description: string;
  payedForEveryone: boolean;
}

const initialForm: Form = {
  payed_by: "",
  payed_for: [],
  amount: undefined,
  description: "",
  payedForEveryone: false,
};

interface AddBillFormProps {
  billGroup: BillGroupDetail;
}

export const AddBillForm = ({ billGroup }: AddBillFormProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Form>(initialForm);
  const { mutate: createBill } = useSplitBillsBillsCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.billGroupDetail],
        });
        setIsOpen(false);
        toast.success("Bill created successfully");
      },
    },
  });

  const membersList = billGroup.bill_group_members.map((member) => ({
    label: member.name,
    value: String(member.id),
  }));

  const isFormValid =
    form.payed_by &&
    (form.payed_for.length > 0 || form.payedForEveryone) &&
    (!form.amount || form.amount > 0) &&
    form.description;

  const handleCreate = () => {
    createBill({
      data: {
        bill_group: billGroup.id,
        amount: form.amount?.toString() ?? "",
        description: form.description,
        payed_by: Number(form.payed_by),
        payed_for: form.payed_for.map((id) => Number(id)),
        payed_for_everyone: form.payedForEveryone,
      },
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

  return (
    <ResponsiveDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add bill"
      description="Enter the details of the bill you want to add"
      trigger={
        <Button variant="default" size="sm" onClick={() => setIsOpen(true)}>
          Add bill
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>Payed by</Label>
          <Select
            value={form.payed_by}
            onValueChange={(value) => setForm({ ...form, payed_by: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a person" />
            </SelectTrigger>
            <SelectContent>
              {billGroup.bill_group_members.map((member) => (
                <SelectItem key={member.id} value={String(member.id)}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Payed for</Label>
          <div className="flex items-center gap-4">
            <Label className="text-sm font-normal text-neutral-400">
              Payed for everyone
            </Label>
            <Switch
              checked={form.payedForEveryone}
              onCheckedChange={() =>
                setForm({ ...form, payedForEveryone: !form.payedForEveryone })
              }
            />
          </div>
          <MultiSelect
            options={membersList}
            onValueChange={(value) => setForm({ ...form, payed_for: value })}
            defaultValue={form.payed_for}
            placeholder="Select people"
            variant="inverted"
            animation={0}
            maxCount={billGroup.bill_group_members.length}
            disabled={form.payedForEveryone}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Amount</Label>
          <Input
            variant="inverted"
            size="lg"
            placeholder={`${billGroup.currency}`}
            value={form.amount}
            type="number"
            onChange={(e) => {
              setForm({
                ...form,
                amount: e.target.value as unknown as number,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Input
            variant="inverted"
            size="lg"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="flex gap-3 mt-4 md:col-span-2 md:justify-end">
          <Button
            variant="ghost"
            className="md:w-fit w-full"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="md:w-fit w-full"
            onClick={handleCreate}
            disabled={!isFormValid}
          >
            Add bill
          </Button>
        </div>
      </div>
    </ResponsiveDrawer>
  );
};
