import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { Input } from '../ui/input';

export type Repo = {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    private: boolean;
    language: string;
    owner: string;
};


function RepoDialog({onRepositoryAdded}: {onRepositoryAdded: () => void | Promise<void>}) {
    const [repos, setRepos] = React.useState<Repo[]>([]);
    const [selectedRepo, setSelectedRepo] = React.useState<Repo | null>(null);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        getrepolist();
    } , []);

    const getrepolist = async () => {
        const response = await axios.get('/api/github/repos');
        const data = await response.data;
        setRepos(data);
        return data;
    } 

    const filteredRepos = repos.filter(repo => repo.full_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const SaveRepoDB = async () => {
        if (!selectedRepo) return;
        const response = await axios.post('/api/user-repo', selectedRepo);
        setIsOpen(false);
        await onRepositoryAdded();
        return response.data;
    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger>
        <Button>Add Repository</Button>
    </DialogTrigger>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Add GitHub Repository</DialogTitle>
      <DialogDescription>
        Search and add a GitHub repository to your workspace. You can connect to your GitHub account and select the repositories you want to include.
      </DialogDescription>
    </DialogHeader>
    <div>
        {/*Repo list */}
        <Input placeholder="Search repositories..." className="mb-4" onChange={(e) => setSearchTerm(e.target.value)} />
        <ul className="max-h-60 overflow-y-auto border rounded-r-2xl">
            {filteredRepos.map((repo) => (
                <li key={repo.id} className={`py-4 border-b border-gray-200 flex justify-between items-center hover:bg-gray-100 cursor-pointer ${selectedRepo?.id === repo.id ? 'bg-gray-200' : ''}`} onClick={() => setSelectedRepo(repo)}>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{repo.full_name}</p>
                        <p className="text-sm text-gray-500">{repo.description}</p>
                    </div>
                    <span className="text-sm text-gray-500">{repo.language}</span>
                </li>
            ))}
        </ul>
    </div>
    <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <Button onClick={SaveRepoDB} disabled={!selectedRepo}>Add</Button>
    </DialogFooter>
    </DialogContent>
</Dialog>
  )
}

export default RepoDialog
