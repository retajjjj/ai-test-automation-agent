import React from 'react'
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import EmptyWorkspace from './EmptyWorkspace';

function WorkspaceBody() {
  return (
    <div>
    <div className = "flex flex-col items-center justify-center h-full">
        <h2 className = "text-2xl font-bold mb-4">Workspace</h2>
    </div>

    <div className="mt-5 flex justify-center items-center space-x-4 border border-gray-300 rounded-lg p-4 shadow-md">
        <Image src="/github.png" alt="Workspace" width={40} height={40} className="rounded-lg shadow-md" />
        <h2> Connect to github and add repositories</h2>
        <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Add </button>
        </div>
    </div>

    <Card>
        <CardContent>
        <EmptyWorkspace />
        </CardContent>
    </Card>
        

    </div>
  )
}

export default WorkspaceBody