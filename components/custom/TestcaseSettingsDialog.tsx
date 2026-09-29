"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SettingsIcon, SlidersHorizontal } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import axios from 'axios'

interface TestCaseForm {
  title: string
  description: string
  targetRoute: string
  expectedResult: string
}

function TestcaseSettingsDialog({ selectedTestCase }: { selectedTestCase?: any }) {
  const [formTestCase, setFormTestCase] = useState<TestCaseForm>({
    title: '',
    description: '',
    targetRoute: '',
    expectedResult: '',
  })

  // Sync internal state when selectedTestCase prop updates
  useEffect(() => {
    if (selectedTestCase) {
      setFormTestCase({
        title: selectedTestCase.title || '',
        description: selectedTestCase.description || '',
        targetRoute: selectedTestCase.targetRoute || '',
        expectedResult: selectedTestCase.expectedResult || '',
      })
    }
  }, [selectedTestCase])

  const handleChange = (field: keyof TestCaseForm, value: string) => {
    setFormTestCase((prev) => ({ ...prev, [field]: value }))
  }

  const saveChanges = async () => {

    const result = await axios.post("/api/test-cases/settings", {   
      title: formTestCase.title,
      description: formTestCase.description,
      targetRoute: formTestCase.targetRoute,
      expectedResult: formTestCase.expectedResult,
      testCaseId: selectedTestCase?.id
    })
  }


  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <SettingsIcon className="h-4 w-4" />
          <span className="sr-only">Edit Test Case Settings</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-lg rounded-2xl">
        {/* Header with Icon */}
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shrink-0">
              <SlidersHorizontal className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <DialogTitle className="text-lg font-semibold tracking-tight">
              Edit Testing Requirements
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Modify testing parameters and add conditions to ensure generated automation scripts align with your expectations.
          </DialogDescription>
        </DialogHeader>

        {/* Form Fields Container */}
        <div className="space-y-4 py-2">
          {/* Test Title */}
          <div className="space-y-1.5">
            <Label htmlFor="test-title" className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Test Title
            </Label>
            <Input
              id="test-title"
              value={formTestCase.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Auth Token Validation"
              className="h-9 text-xs border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500"
            />
          </div>

          {/* Target Route */}
          <div className="space-y-1.5">
            <Label htmlFor="target-route" className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Target Route
            </Label>
            <Input
              id="target-route"
              value={formTestCase.targetRoute}
              onChange={(e) => handleChange('targetRoute', e.target.value)}
              placeholder="e.g., /api/v1/auth/login"
              className="h-9 text-xs font-mono border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={formTestCase.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Briefly describe what this test case verifies..."
              className="min-h-[70px] text-xs resize-none border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500"
            />
          </div>

          {/* Expected Result */}
          <div className="space-y-1.5">
            <Label htmlFor="expected-result" className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Expected Result
            </Label>
            <Textarea
              id="expected-result"
              value={formTestCase.expectedResult}
              onChange={(e) => handleChange('expectedResult', e.target.value)}
              placeholder="Specify expected API response or UI outcome..."
              className="min-h-[70px] text-xs resize-none border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <DialogClose>
            <Button
              type="button"
              variant="outline"
              className="h-8 px-4 text-xs font-medium border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="h-8 px-4 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TestcaseSettingsDialog