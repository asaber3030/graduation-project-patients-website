"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { cancelAppointment } from "@/actions/appointments";
import { toast } from "react-toastify";
import { LoadingButton } from "@/components/common/loading-button";
import { Appointment } from "@prisma/client";

export function CancelAppointmentModal({ appointment }: { appointment: Appointment }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => cancelAppointment(appointment.id),
    onSuccess: () => {
      toast.success("Appointment cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => toast.error(error?.message || "Failed to cancel appointment"),
  });

  const handleCancel = () => {
    if (appointment.status === "confirmed") {
      toast.error("Cannot cancel a confirmed appointment");
      return;
    }

    if (confirm("Are you sure you want to cancel this appointment?")) {
      mutation.mutate();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={appointment.status === "confirmed"}
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogDescription>{appointment.status === "confirmed" ? "This appointment is confirmed and cannot be cancelled." : "Are you sure you want to cancel this appointment? This action cannot be undone."}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>
              <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <p>
              <strong>Status:</strong> {appointment.status}
            </p>
          </div>
          {appointment.status !== "confirmed" && (
            <div className="flex gap-2">
              <LoadingButton
                onClick={handleCancel}
                loading={mutation.isPending}
                variant="destructive"
                className="flex-1"
              >
                Cancel Appointment
              </LoadingButton>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
