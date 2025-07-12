"use client";

import { InputField } from "@/components/common/form/input-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { MedicationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { createMedication } from "@/actions/medications";
import { z } from "zod";
import { showResponse } from "@/lib/utils";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";
import { SearchableSelectField } from "@/components/common/form/searchable-select-field";

// Custom form schema that uses strings for dates
const CreateFormSchema = z.object({
  dosage: z.string().min(1, { message: "Dosage is Required" }),
  startDate: z.string().min(1, { message: "Start Date is Required" }),
  endDate: z.string().min(1, { message: "End Date is Required" }),
  notes: z.string().min(1, { message: "Notes is Required" }),
  medicineId: z.number().int().min(1, { message: "Medicine ID is Required" }),
});

export function CreateMedicationModal() {
  const form = useForm({
    resolver: zodResolver(CreateFormSchema),
  });
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof MedicationSchema.create>) => createMedication(data),
    onSuccess: (data) => {
      showResponse(data);
      qc.invalidateQueries({ queryKey: ["medications"] });
      form.reset();
    },
    onError: (error) => toast.error(error?.message || "Failed to create medication"),
  });

  const handleSubmit = form.handleSubmit((data) => {
    const processedData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    mutation.mutate(processedData);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          icon={Plus}
          variant="outline"
        >
          Add Medication
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Create new medication</DialogTitle>
          <DialogDescription>Add a new medication to your account.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <SearchableSelectField
              label="Medicine"
              name="medicineId"
              control={form.control}
              placeholder="Select medicine"
              searchPlaceholder="Search medicines by name..."
              valueAsNumber
            />
            <InputField
              label="Dosage"
              name="dosage"
              control={form.control}
              placeholder="Enter dosage (e.g., 100mg)"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Start Date"
                name="startDate"
                control={form.control}
                type="date"
              />
              <InputField
                label="End Date"
                name="endDate"
                control={form.control}
                type="date"
              />
            </div>
            <InputField
              label="Notes"
              name="notes"
              control={form.control}
              placeholder="Enter notes or special instructions"
              isTextarea={true}
            />
            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              className="w-full"
            >
              Create Medication
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
