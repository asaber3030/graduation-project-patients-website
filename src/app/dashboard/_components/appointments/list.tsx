"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/actions/appointments";
import { diffForHumans } from "@/lib/utils";

import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NoDataLabel } from "@/components/common/no-data-label";
import { CreateAppointmentModal } from "./create";
import { CancelAppointmentModal } from "./cancel";

export function AppointmentsList() {
  const { data: appointments, isPending } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Your Appointments</h2>
        <CreateAppointmentModal />
      </div>
      {isPending ? (
        <Loader className="animate-spin size-4" />
      ) : (
        <div>
          {appointments?.length == 0 ? (
            <NoDataLabel />
          ) : (
            <div className="grid gap-4">
              {appointments?.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">{appointment.doctor.name}</CardTitle>
                    <div className="flex space-x-2">
                      <CancelAppointmentModal appointment={appointment} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Hospital</p>
                        <p className="text-gray-600">{appointment.hospital.name}</p>
                      </div>
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">{diffForHumans(appointment.date)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">{appointment.time}</p>
                      </div>
                      <div>
                        <p className="font-medium">Status</p>
                        <Badge variant={appointment.status === "completed" ? "secondary" : "default"}>{appointment.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
