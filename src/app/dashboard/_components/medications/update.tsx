"use client";

import { InputField } from "@/components/common/form/input-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { MedicationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { updateMedication } from "@/actions/medications";
import { z } from "zod";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";
import { SearchableSelectField } from "@/components/common/form/searchable-select-field";
import { PatientMedication } from "@prisma/client";
import { useEffect } from "react";

const UpdateFormSchema = z.object({
  dosage: z.string().min(1, { message: "Dosage is Required" }).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  notes: z.string().min(1, { message: "Notes is Required" }).optional(),
  medicineId: z.number().int().min(1, { message: "Medicine ID is Required" }).optional(),
});

export function UpdateMedicationModal({ medication }: { medication: PatientMedication }) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(UpdateFormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof MedicationSchema.update>) => updateMedication(medication.id, data),
    onSuccess: () => {
      toast.success("Medication updated successfully");
      queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
    onError: (error) => toast.error(error?.message || "Failed to update medication"),
  });

  useEffect(() => {
    if (medication) {
      form.reset({
        medicineId: medication.medicineId,
        dosage: medication.dosage,
        startDate: medication.startDate ? new Date(medication.startDate).toISOString().split("T")[0] : "",
        endDate: medication.endDate ? new Date(medication.endDate).toISOString().split("T")[0] : "",
        notes: medication.notes || "",
      });
    }
  }, [medication, form]);

  const handleSubmit = form.handleSubmit((data) => {
    // Convert string dates to Date objects for the schema
    const processedData = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    };
    mutation.mutate(processedData);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Update medication</DialogTitle>
          <DialogDescription>Update your medication information.</DialogDescription>
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
              valueAsNumber={true}
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
              Update Medication
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
