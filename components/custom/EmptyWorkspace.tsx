import React from 'react'
import Image from 'next/image';
import { Button } from '@base-ui/react/button';


function EmptyWorkspace() {
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <Image src="/open-folder.png" alt="Empty Workspace" width={70} height={70} className="mx-auto mb-4" />
      <h2 className="text-lg font-semibold mb-2">No repositories connected</h2>
      <p className="text-gray-600">Connect to GitHub to add repositories to your workspace.</p>
      <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        Connect to GitHub
      </Button>
    </div>
  )
}

export default EmptyWorkspace
