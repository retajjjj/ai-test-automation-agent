"use client"

import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import EmptyWorkspace from './EmptyWorkspace'
import UserRepoList from './userRepoList'

import { Button } from '../ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import RepoDialog, { Repo } from './RepoDialog'

function WorkspaceBody() {
  const router = useRouter()
  const [token, setToken] = React.useState("")
  const [addedRepos, setAddedRepos] = React.useState<Repo[] | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([getToken(), getAddedRepo()])
      setLoading(false)

    }
    fetchData()
  }, [])

  const getToken = async () => {
    try {
      const response = await axios.get('/api/github/token')
      setToken(response.data.token)
    } catch (error) {
      console.error("Error fetching token:", error)
    }
  }

  const handleAddRepository = async () => {
    router.push('/api/github')
  }

  const getAddedRepo = async () => {
    try {
      const result = await axios.get('/api/user-repo')
      setAddedRepos(result.data)
      return result.data

    } catch (error) {
      console.error("Error fetching user repos:", error)
      setAddedRepos([])
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Workspace
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your GitHub integration and view active repositories.
        </p>
      </div>

      {/* GitHub Integration Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shadow-sm transition-all duration-200">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs shrink-0">
            <Image
              src="/github.png"
              alt="GitHub"
              width={36}
              height={36}
              className="rounded-md"
            />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                GitHub Connection
              </h2>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                  token
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
                }`}
              >
                {token ? 'Connected' : 'Action Required'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Connect to GitHub to import and synchronize repositories.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex justify-end shrink-0 pt-2 sm:pt-0">
          {!token ? (
            <Button
              onClick={handleAddRepository}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 font-medium px-5 py-2 rounded-xl text-xs transition-colors shadow-sm"
            >
              Setup Integration
            </Button>
          ) : (
            <RepoDialog onRepositoryAdded={getAddedRepo} />
          )}
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm bg-white dark:bg-slate-950 overflow-hidden">
        <CardContent className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-6 h-6 border-2 border-slate-900 dark:border-slate-100 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Loading repositories...
              </p>
            </div>
          ) : !addedRepos || addedRepos.length === 0 ? (
            <EmptyWorkspace />
          ) : (
            <UserRepoList repos={addedRepos} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default WorkspaceBody