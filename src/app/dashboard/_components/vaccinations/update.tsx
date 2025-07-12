"use client";

import { InputField } from "@/components/common/form/input-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { VaccinationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { updateVaccination } from "@/actions/vaccinations";
import { z } from "zod";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";
import { PatientVaccination } from "@prisma/client";
import { useEffect } from "react";

const UpdateVaccinationFormSchema = z.object({
  vaccineName: z.string().min(1, { message: "Vaccine Name is Required" }).optional(),
  vaccineDate: z.string().optional(),
  vaccineNotes: z.string().min(1, { message: "Vaccine Notes is Required" }).optional(),
});

export function UpdateVaccinationModal({ vaccination }: { vaccination: PatientVaccination }) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(UpdateVaccinationFormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof VaccinationSchema.update>) => updateVaccination(vaccination.id, data),
    onSuccess: () => {
      toast.success("Vaccination updated successfully");
      queryClient.invalidateQueries({ queryKey: ["vaccinations"] });
    },
    onError: (error) => toast.error(error?.message || "Failed to update vaccination"),
  });

  useEffect(() => {
    if (vaccination) {
      form.reset({
        vaccineName: vaccination.vaccineName,
        vaccineDate: vaccination.vaccineDate ? new Date(vaccination.vaccineDate).toISOString().split("T")[0] : "",
        vaccineNotes: vaccination.vaccineNotes || "",
      });
    }
  }, [vaccination, form]);

  const handleSubmit = form.handleSubmit((data) => {
    // Convert string date to Date object for the schema
    const processedData = {
      ...data,
      vaccineDate: data.vaccineDate ? new Date(data.vaccineDate) : undefined,
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
          <DialogTitle>Update vaccination</DialogTitle>
          <DialogDescription>Update your vaccination information.</DialogDescription>
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
              Update Vaccination
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
