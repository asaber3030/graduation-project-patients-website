"use client";

import { InputField } from "@/components/common/form/input-field";
import { HospitalSearchableSelectField } from "@/components/common/form/hospital-searchable-select-field";
import { DoctorSearchableSelectField } from "@/components/common/form/doctor-searchable-select-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AppointmentSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { createAppointment } from "@/actions/appointments";
import { z } from "zod";
import { showResponse } from "@/lib/utils";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";

// Custom form schema that uses strings for dates
const CreateAppointmentFormSchema = z.object({
  date: z.string().min(1, { message: "Date is Required" }),
  time: z.string().min(1, { message: "Time is Required" }),
  doctorId: z.number().int().min(1, { message: "Doctor is Required" }),
  hospitalId: z.number().int().min(1, { message: "Hospital is Required" }),
});

export function CreateAppointmentModal() {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(CreateAppointmentFormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof AppointmentSchema.create>) => createAppointment(data),
    onSuccess: (data) => {
      showResponse(data);
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      form.reset();
    },
    onError: (error) => toast.error(error?.message || "Failed to create appointment"),
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          icon={Plus}
          variant="outline"
        >
          Schedule Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Schedule new appointment</DialogTitle>
          <DialogDescription>Schedule a new appointment with a doctor.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Date"
                name="date"
                control={form.control}
                type="date"
              />
              <InputField
                label="Time"
                name="time"
                control={form.control}
                type="time"
              />
            </div>
            <DoctorSearchableSelectField
              label="Doctor"
              name="doctorId"
              control={form.control}
              placeholder="Select doctor"
              searchPlaceholder="Search doctors by name, specialty, or email..."
              valueAsNumber={true}
            />
            <HospitalSearchableSelectField
              label="Hospital"
              name="hospitalId"
              control={form.control}
              placeholder="Select hospital"
              valueAsNumber={true}
            />
            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              className="w-full"
            >
              Schedule Appointment
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
