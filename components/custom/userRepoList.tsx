import React, { useState } from 'react'
import { Repo } from './RepoDialog'
import Image from 'next/image'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { CheckCircle2, ListChecks, Loader2, Sparkles, TrendingUp, XCircle } from 'lucide-react'
import axios from 'axios'
import TestcaseList from './TestcaseList'

export type TestCase = {
  id: number;
  title: string;
  description: string;
  type: string;
  priority: string;
  targetRoute: string;
  targetFiles: string[];
  expectedResult: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  repoName: string;
  repoId: number;
  repoOwner: string;
}

function UserRepoList({ repos }: { repos: Repo[] }) {
  const [loadingRepoId, setLoadingRepoId] = useState<number | null>(null);
  const [testcaseLoading, setTestcaseLoading] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const totalTests = testCases.length
  const passedTests = testCases.filter((tc) => tc.status === 'passed').length
  const failedTests = testCases.filter((tc) => tc.status === 'failed').length
  const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(2) : 0

  const handleGenerateTestCases = async (repo: Repo) => {
    setLoadingRepoId(repo.id);
    try {
      await axios.post('/api/generate-test-case', {
        userId: 1, 
        owner: repo.owner,
        repoId: repo.id,
        repo: repo.name,
        branch: 'main',
      });
      // Re-fetch test cases after generation completes
      await GetTestCases(repo.id);
    } catch (error) {
      console.error('Error generating test cases:', error);
    } finally {
      setLoadingRepoId(null);
    }
  }

  const GetTestCases = async (repoId: number) => {
    if (!repoId) return;
    setTestcaseLoading(true);
    setTestCases([]); // Clear previous test cases
    try {
      const response = await axios.get(`/api/test-cases?repoId=${repoId}`);
      setTestCases(response.data || []);
    } catch (error) {
      console.error('Error fetching test cases:', error);
    } finally {
      setTestcaseLoading(false);
    }
  };

  return (
    <div className="mt-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Repositories
        </h2>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {repos.length} {repos.length === 1 ? 'repo' : 'repos'}
        </span>
      </div>

      {/* Accordion List */}
      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-3" 
        onValueChange={(value) => {
          if (value) {
            GetTestCases(Number(value))
          } else {
            setTestCases([])
          }
        }}
      >
        {repos.map((repo) => {
          const isGenerating = loadingRepoId === repo.id;

          return (
            <AccordionItem
              key={repo.id}
              value={repo.id.toString()}
              className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 px-4 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <AccordionTrigger className="py-3.5 hover:no-underline group">
                <div className="flex items-center gap-3 text-left">
                  {/* Repo Icon */}
                  <div className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
                    <Image
                      src="/github.png"
                      alt="Repository"
                      width={22}
                      height={22}
                      className="rounded-md"
                    />
                  </div>

                  {/* Info Container */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {repo.full_name}
                    </h3>
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-normal">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          repo.private
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50'
                        }`}
                      >
                        {repo.private ? 'Private' : 'Public'}
                      </span>
                      
                      {repo.language && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-slate-600 dark:text-slate-300">
                            {repo.language}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>

              {/* Expanded Content */}
              <AccordionContent>
                <div className="pt-4 space-y-5">
                  {/* Status Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatusCard
                      title="Total Tests"
                      value={totalTests}
                      icon={<ListChecks className="h-5 w-5 text-blue-600" />}
                      bgColor="bg-blue-50"
                    />

                    <StatusCard
                      title="Passed"
                      value={passedTests}
                      icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                      bgColor="bg-green-50"
                    />

                    <StatusCard
                      title="Failed"
                      value={failedTests}
                      icon={<XCircle className="h-5 w-5 text-red-600" />}
                      bgColor="bg-red-50"
                    />

                    <StatusCard
                      title="Pass Rate"
                      value={`${passRate}%`}
                      icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
                      bgColor="bg-purple-50"
                    />
                  </div>

                  {/* Test Cases Section / Loading States */}
                  {testcaseLoading ? (
                    <div className="flex items-center justify-center gap-2 p-8 border rounded-xl bg-slate-50 text-slate-600 text-sm">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <span>Fetching test cases...</span>
                    </div>
                  ) : testCases.length > 0 ? (
                    <TestcaseList testCases={testCases} />
                  ) : null}

                  {/* Action Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl p-4 bg-gray-50 dark:bg-slate-900/50">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">
                        {isGenerating ? 'Generating Test Cases...' : 'Generate AI Test Cases'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                        Analyze this repository and generate automated test cases using AI.
                      </p>
                    </div>

                    <Button 
                      className="gap-2 shrink-0" 
                      disabled={isGenerating || testcaseLoading} 
                      onClick={() => handleGenerateTestCases(repo)}
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      {isGenerating ? 'Generating...' : 'Generate Test Cases'}
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default UserRepoList

function StatusCard({
  title,
  value,
  icon,
  bgColor
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  bgColor: string
}) {
  return (
    <div className="border rounded-xl p-4 flex items-center justify-between bg-white dark:bg-slate-900">
      <div>
        <p className="text-sm text-gray-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-semibold mt-1 text-slate-900 dark:text-slate-100">{value}</h3>
      </div>

      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${bgColor}`}>
        {icon}
      </div>
    </div>
  )
}