import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';


function WorkspaceHeader() {
  return (
    <div className = "flex w-full items-center justify-between p-4 bg-white-800 text-black-800">
      {/*logo*/}
      <Image src="/logo.png" alt="Logo" width={200} height={200} />
      {/* menu options*/}
      <ul className="flex space-x-6">
        <li className= "hover:text-blue-600">Workspace</li>
        <li className= "hover:text-blue-600">About</li>
        <li className= "hover:text-blue-600">Contact</li>   
      </ul>

      {/* user button */}
      <UserButton />

    </div>
  )
}

export default WorkspaceHeader
