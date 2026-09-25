"use client"
import React from 'react'
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import EmptyWorkspace from './EmptyWorkspace';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function WorkspaceBody() {
    const router = useRouter();
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        getToken();
    }, []);

    const getToken = async () => {
        const response = await axios.get('/api/github/token');
        setToken(response.data.token);
    }

    const handleAddRepository = async () => {
        router.push('/api/github');
        
        
    }
  return (
    <div>
    <div className = "flex flex-col items-center justify-center h-full">
        <h2 className = "text-2xl font-bold mb-4">Workspace</h2>
    </div>

    <div className="mt-5 flex justify-center items-center space-x-4 border border-gray-300 rounded-lg p-4 shadow-md">
        <Image src="/github.png" alt="Workspace" width={40} height={40} className="rounded-lg shadow-md" />
        <h2> Connect to github and add repositories</h2>
        <div>

            {!token?<Button onClick={handleAddRepository} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Setup</Button>
            :<Button className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md cursor-not-allowed">Add Repository</Button>}
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