"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface MedicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingItem?: any
  onClose: () => void
}

export function MedicationModal({ open, onOpenChange, editingItem, onClose }: MedicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    instructions: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || "",
        dosage: editingItem.dosage || "",
        frequency: editingItem.frequency || "",
        instructions: editingItem.instructions || "",
        startDate: editingItem.startDate || "",
        endDate: editingItem.endDate || "",
      })
    } else {
      setFormData({
        name: "",
        dosage: "",
        frequency: "",
        instructions: "",
        startDate: "",
        endDate: "",
      })
    }
  }, [editingItem])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Medication data:", formData)
    onOpenChange(false)
    onClose()
  }

  const handleClose = () => {
    onOpenChange(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingItem ? "Edit Medication" : "Add New Medication"}</DialogTitle>
          <DialogDescription>
            {editingItem ? "Update your medication information." : "Add a new medication to your list."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Medication Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter medication name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                placeholder="e.g., 100mg"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once-daily">Once daily</SelectItem>
                  <SelectItem value="twice-daily">Twice daily</SelectItem>
                  <SelectItem value="three-times-daily">Three times daily</SelectItem>
                  <SelectItem value="four-times-daily">Four times daily</SelectItem>
                  <SelectItem value="as-needed">As needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Special instructions or notes"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">{editingItem ? "Update" : "Add"} Medication</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
