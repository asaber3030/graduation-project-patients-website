"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccinations, deleteVaccination } from "@/actions/vaccinations";
import { diffForHumans } from "@/lib/utils";

import { Trash2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NoDataLabel } from "@/components/common/no-data-label";
import { CreateVaccinationModal } from "./create";
import { UpdateVaccinationModal } from "./update";
import { toast } from "react-toastify";

export function VaccinationsList() {
  const queryClient = useQueryClient();

  const { data: vaccinations, isPending } = useQuery({
    queryKey: ["vaccinations"],
    queryFn: getVaccinations,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVaccination,
    onSuccess: () => {
      toast.success("Vaccination deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["vaccinations"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete vaccination");
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this vaccination?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Your Vaccinations</h2>
        <CreateVaccinationModal />
      </div>
      {isPending ? (
        <Loader className="animate-spin size-4" />
      ) : (
        <div>
          {vaccinations?.length == 0 ? (
            <NoDataLabel />
          ) : (
            <div className="grid gap-4">
              {vaccinations?.map((vaccination) => (
                <Card key={vaccination.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">{vaccination.vaccineName}</CardTitle>
                    <div className="flex space-x-2">
                      <UpdateVaccinationModal vaccination={vaccination} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(vaccination.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Date Received</p>
                        <p className="text-gray-600">{diffForHumans(vaccination.vaccineDate)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Status</p>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <div>
                        <p className="font-medium">Notes</p>
                        <p className="text-gray-600">{vaccination.vaccineNotes || "N/A"}</p>
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
