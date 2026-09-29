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
import { Settings2, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { Repo } from './RepoDialog'

function RepoSettings({ repo }: { repo: Repo }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [repoSettings, setRepoSettings] = useState({
    globalInstruction: repo?.globalInstruction || '',
    targetDomain: repo?.targetDomain || ''
  })

  useEffect(() => {
    if (repo) {
      setRepoSettings({
        globalInstruction: repo.globalInstruction || '',
        targetDomain: repo.targetDomain || ''
      })
    }
  }, [repo])

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/user-repo/settings', {
        repoId: repo.id,
        globalInstruction: repoSettings.globalInstruction,
        targetDomain: repoSettings.targetDomain
      })
      console.log('Settings saved:', response.data)

      // Close the dialog first
      setIsOpen(false)
      
      // Perform full browser page refresh
      window.location.reload()
    } catch (error) {
      console.error('Error saving settings:', error)
      setLoading(false)
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 font-medium text-xs h-8 px-3 rounded-lg shadow-xs transition-colors shrink-0">
            <Settings2 className="h-3.5 w-3.5" />
            <span>Project Configuration</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-lg rounded-2xl">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-lg font-semibold tracking-tight flex items-center gap-2">
              <Settings2 className="text-primary h-4 w-4" />
              <span>Project Configuration</span>
            </DialogTitle>

            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Configure your project settings, including target domain and other relevant parameters. These settings will be used for generating test cases and running tests.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="app-URL" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                App URL
              </Label>
              <Input
                id="app-URL"
                value={repoSettings.targetDomain}
                placeholder="App url"
                onChange={(e) => setRepoSettings({ ...repoSettings, targetDomain: e.target.value })}
                className="h-9 text-xs font-mono border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="test-instructions" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Global Test Instruction
              </Label>
              <Textarea
                id="test-instructions"
                placeholder="Global test instructions"
                value={repoSettings.globalInstruction}
                onChange={(e) => setRepoSettings({ ...repoSettings, globalInstruction: e.target.value })}
                className="min-h-[80px] text-xs resize-none border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="h-8 px-4 text-xs font-medium border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              disabled={loading}
              onClick={handleSaveSettings}
              className="h-8 px-4 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors gap-2"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {loading ? 'Saving...' : 'Save Configuration'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RepoSettings