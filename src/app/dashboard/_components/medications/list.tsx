"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedications, deleteMedication } from "@/actions/medications";
import { diffForHumans } from "@/lib/utils";

import { Trash2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoDataLabel } from "@/components/common/no-data-label";
import { CreateMedicationModal } from "./create";
import { UpdateMedicationModal } from "./update";
import { toast } from "react-toastify";

export function MedicationsList() {
  const queryClient = useQueryClient();

  const { data: medications, isPending } = useQuery({
    queryKey: ["medications"],
    queryFn: getMedications,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      toast.success("Medication deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete medication");
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this medication?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Your Medications</h2>
        <CreateMedicationModal />
      </div>
      {isPending ? (
        <Loader className="animate-spin size-4" />
      ) : (
        <div>
          {medications?.length == 0 ? (
            <NoDataLabel />
          ) : (
            <div className="grid gap-4">
              {medications?.map((med) => (
                <Card key={med.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">{med.medicine?.enName}</CardTitle>
                    <div className="flex space-x-2">
                      <UpdateMedicationModal medication={med} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(med.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Notes</p>
                        <p className="text-gray-600">{med.notes || "N/A"}</p>
                      </div>
                      <div>
                        <p className="font-medium">Start Date</p>
                        <p className="text-gray-600">{diffForHumans(med.startDate)}</p>
                      </div>
                      <div>
                        <p className="font-medium">End Date</p>
                        <p className="text-gray-600">{diffForHumans(med.endDate)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Dosage</p>
                        <p className="text-gray-600">{med.dosage || "N/A"}</p>
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
