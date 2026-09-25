import React from 'react'
import WorkspaceHeader from '@/components/custom/workspaceHeader'


function WorkspaceLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className = "flex flex-col h-full">
      <WorkspaceHeader />
        {children}
      
    </div>
  )
}

export default WorkspaceLayout
