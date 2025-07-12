"use client";

import { useState, useEffect, useCallback } from "react";
import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Input } from "../../ui/input";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";
import { Search, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/actions/doctors";

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
  searchPlaceholder?: string;
  valueAsNumber?: boolean;
};

export const DoctorSearchableSelectField = ({ name, disabled, description, label, formFieldDisabled, formFieldDefaultValue, placeholder, control, defaultValue, className, searchPlaceholder = "Search doctors...", valueAsNumber = false }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctorData, setSelectedDoctorData] = useState<any>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data: doctors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["doctors", debouncedQuery],
    queryFn: () => getDoctors(debouncedQuery),
    enabled: isOpen && debouncedQuery.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchQuery("");
      setDebouncedQuery("");
    }
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      disabled={formFieldDisabled}
      render={({ field }) => {
        // Find the selected doctor to display its name
        const selectedDoctor = selectedDoctorData || doctors?.find((doctor: any) => doctor.id.toString() === field.value?.toString());

        return (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select
                value={field.value?.toString() || ""}
                onValueChange={(value) => {
                  console.log("Selected doctor value:", value);
                  // Convert to number if valueAsNumber is true
                  const finalValue = valueAsNumber ? parseInt(value) : value;
                  field.onChange(finalValue);

                  // Store the selected doctor data
                  const selected = doctors?.find((doctor: any) => doctor.id.toString() === value);
                  if (selected) {
                    setSelectedDoctorData(selected);
                  }

                  setIsOpen(false);
                  setSearchQuery("");
                  setDebouncedQuery("");
                }}
                onOpenChange={handleOpenChange}
              >
                <SelectTrigger
                  className={cn("w-full", className)}
                  disabled={disabled}
                >
                  <SelectValue placeholder={placeholder}>{selectedDoctor ? selectedDoctor.name : field.value ? "Selected" : placeholder}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-auto">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader className="h-4 w-4 animate-spin" />
                        <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                      </div>
                    ) : error ? (
                      <div className="py-4 text-center text-sm text-red-500">Error loading doctors. Please try again.</div>
                    ) : doctors && doctors.length > 0 ? (
                      doctors.map((doctor: any) => (
                        <SelectItem
                          key={doctor.id}
                          value={doctor.id.toString()}
                        >
                          <div className="flex flex-col w-full max-w-full">
                            <span className="font-medium truncate text-sm">{doctor.name}</span>
                            <span className="text-xs text-muted-foreground truncate">{doctor.jobTitle}</span>
                            <span className="text-xs text-muted-foreground truncate">{doctor.hospital?.name}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="py-4 text-center text-sm text-muted-foreground">{searchQuery ? "No doctors found" : "Start typing to search doctors"}</div>
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
