import React from 'react'
import { TestCase } from './userRepoList'
import { Checkbox } from '../ui/checkbox'
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'
import { Play, SettingsIcon, RefreshCw } from 'lucide-react'
import TestcaseSettingsDialog from './TestcaseSettingsDialog'

function TestcaseList({testCases}: {testCases: TestCase[]}) {
    const [selectedTestCases, setSelectedTestCases] = React.useState<TestCase[]>([]);
    const handleRunSelected = () => {
        // Logic to run selected test cases
    }
    const handleSelectedTestCase=(checked: boolean, testCase: TestCase)=>{
        if (checked) {
            setSelectedTestCases([...selectedTestCases, testCase]);
        } else {
            setSelectedTestCases(selectedTestCases.filter((t) => t !== testCase));
        }
    }
  return (
    <div>
        <div className="flex items-center justify-between mb-4">
      <h2 className="text-lime-500"> Generated Test Cases</h2>
      
      </div>
      <div className="border rounded-md">
        
        {testCases.map((testCase, index) => ( 
          <div key={index} className="p-4 border flex items-center justify-between rounded-lg mb-2 dark:bg-slate-900/50">
            <div className="flex gap-3 items-center">
            <Checkbox checked= {selectedTestCases.some((items: any)=> items.id === testCase.id)} onCheckedChange={(checked) => handleSelectedTestCase(checked, testCase)} />
            <div>
                <h3>{testCase.title}</h3>
                <p className="text-xs text-gray-500">{testCase.description}</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Badge variant="secondary"> {testCase.type}</Badge>
            <Badge variant="secondary"> Pending</Badge>
            <TestcaseSettingsDialog selectedTestCase={testCase} />
          

          </div>
          </div>
        ))}
        <div className="p-4 flex items-center justify-between bg-gray-100">
            <h2> Run Selected Test Cases</h2>
            <Button disabled={!selectedTestCases.length}> <Play className="h-4 w-4 mr-2 shimmer-color-emerald-500"> </Play>  Run Selected</Button>
        </div>
      </div>
    </div>
  )
}

export default TestcaseList
