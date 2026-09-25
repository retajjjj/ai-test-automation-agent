import WorkspaceBody from '@/components/custom/WorkspaceBody'
import React from 'react'

function Workspace() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-8 px-4 sm:px-6 bg-slate-50/50 dark:bg-slate-950/50">
      <main className="w-full lg:w-[75%] max-w-[1200px] transition-all duration-300">
        <WorkspaceBody />
      </main>
    </div>
  )
}

export default Workspace