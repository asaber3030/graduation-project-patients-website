"use client";

import { InputField } from "@/components/common/form/input-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { VaccinationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { createVaccination } from "@/actions/vaccinations";
import { z } from "zod";
import { showResponse } from "@/lib/utils";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";

// Custom form schema that uses strings for dates
const CreateVaccinationFormSchema = z.object({
  vaccineName: z.string().min(1, { message: "Vaccine Name is Required" }),
  vaccineDate: z.string().min(1, { message: "Vaccine Date is Required" }),
  vaccineNotes: z.string().min(1, { message: "Vaccine Notes is Required" }),
});

export function CreateVaccinationModal() {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(CreateVaccinationFormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof VaccinationSchema.create>) => createVaccination(data),
    onSuccess: (data) => {
      showResponse(data);
      queryClient.invalidateQueries({ queryKey: ["vaccinations"] });
      form.reset();
    },
    onError: (error) => toast.error(error?.message || "Failed to create vaccination"),
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Convert string date to Date object for the schema
    const processedData = {
      ...data,
      vaccineDate: new Date(data.vaccineDate),
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
          Add Vaccination
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Create new vaccination</DialogTitle>
          <DialogDescription>Add a new vaccination to your record.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <InputField
              label="Vaccine Name"
              name="vaccineName"
              control={form.control}
              placeholder="Enter vaccine name (e.g., COVID-19, Flu Shot)"
            />
            <InputField
              label="Vaccination Date"
              name="vaccineDate"
              control={form.control}
              type="date"
            />
            <InputField
              label="Notes"
              name="vaccineNotes"
              control={form.control}
              placeholder="Enter notes about the vaccination"
              isTextarea={true}
            />
            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              className="w-full"
            >
              Create Vaccination
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
