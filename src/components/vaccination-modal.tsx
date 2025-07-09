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

interface VaccinationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingItem?: any
  onClose: () => void
}

export function VaccinationModal({ open, onOpenChange, editingItem, onClose }: VaccinationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    provider: "",
    lotNumber: "",
    nextDue: "",
    notes: "",
  })

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || "",
        date: editingItem.date || "",
        provider: editingItem.provider || "",
        lotNumber: editingItem.lotNumber || "",
        nextDue: editingItem.nextDue || "",
        notes: editingItem.notes || "",
      })
    } else {
      setFormData({
        name: "",
        date: "",
        provider: "",
        lotNumber: "",
        nextDue: "",
        notes: "",
      })
    }
  }, [editingItem])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Vaccination data:", formData)
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
          <DialogTitle>{editingItem ? "Edit Vaccination" : "Add New Vaccination"}</DialogTitle>
          <DialogDescription>
            {editingItem ? "Update your vaccination record." : "Add a new vaccination to your records."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Vaccine Name</Label>
              <Select value={formData.name} onValueChange={(value) => setFormData({ ...formData, name: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vaccine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="covid-19">COVID-19</SelectItem>
                  <SelectItem value="flu">Influenza (Flu)</SelectItem>
                  <SelectItem value="hepatitis-b">Hepatitis B</SelectItem>
                  <SelectItem value="tetanus">Tetanus</SelectItem>
                  <SelectItem value="mmr">MMR</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date Received</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="provider">Healthcare Provider</Label>
              <Input
                id="provider"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                placeholder="Doctor or clinic name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lotNumber">Lot Number</Label>
              <Input
                id="lotNumber"
                value={formData.lotNumber}
                onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                placeholder="Vaccine lot number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextDue">Next Due Date</Label>
              <Input
                id="nextDue"
                type="date"
                value={formData.nextDue}
                onChange={(e) => setFormData({ ...formData, nextDue: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional notes or reactions"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">{editingItem ? "Update" : "Add"} Vaccination</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
