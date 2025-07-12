"use client";

import { useState, useEffect, useCallback } from "react";
import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHospitals } from "@/actions/hospitals";

type Props = {
  label: string;
  name: string;
  description?: string;
  formFieldDisabled?: boolean;
  formFieldDefaultValue?: string;
  control: Control<any, any>;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  className?: ClassValue;
  valueAsNumber?: boolean;
};

export const HospitalSearchableSelectField = ({ name, disabled, description, label, formFieldDisabled, formFieldDefaultValue, placeholder, control, defaultValue, className, valueAsNumber = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHospitalData, setSelectedHospitalData] = useState<any>(null);

  const {
    data: hospitals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hospitals"],
    queryFn: () => getHospitals(),
    enabled: isOpen,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      disabled={formFieldDisabled}
      render={({ field }) => {
        // Find the selected hospital to display its name
        const selectedHospital = selectedHospitalData || hospitals?.find((hospital: any) => hospital.id.toString() === field.value?.toString());

        return (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select
                value={field.value?.toString() || ""}
                onValueChange={(value) => {
                  console.log("Selected hospital value:", value);
                  // Convert to number if valueAsNumber is true
                  const finalValue = valueAsNumber ? parseInt(value) : value;
                  field.onChange(finalValue);

                  // Store the selected hospital data
                  const selected = hospitals?.find((hospital: any) => hospital.id.toString() === value);
                  if (selected) {
                    setSelectedHospitalData(selected);
                  }

                  setIsOpen(false);
                }}
                onOpenChange={handleOpenChange}
              >
                <SelectTrigger
                  className={cn("w-full", className)}
                  disabled={disabled}
                >
                  <SelectValue placeholder={placeholder}>{selectedHospital ? selectedHospital.name : field.value ? "Selected" : placeholder}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <div className="max-h-60 overflow-auto">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader className="h-4 w-4 animate-spin" />
                        <span className="ml-2 text-sm text-muted-foreground">Loading hospitals...</span>
                      </div>
                    ) : error ? (
                      <div className="py-4 text-center text-sm text-red-500">Error loading hospitals. Please try again.</div>
                    ) : hospitals && hospitals.length > 0 ? (
                      hospitals.map((hospital: any) => (
                        <SelectItem
                          key={hospital.id}
                          value={hospital.id.toString()}
                        >
                          <div className="flex flex-col w-full max-w-full">
                            <span className="font-medium truncate text-sm">{hospital.name}</span>
                            <span className="text-xs text-muted-foreground truncate">{hospital.location}</span>
                            {hospital.description && <span className="text-xs text-muted-foreground truncate mt-1">{hospital.description}</span>}
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="py-4 text-center text-sm text-muted-foreground">No hospitals available</div>
                    )}
                  </div>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
