/* import React from 'react'
import { TestCase } from './userRepoList'
import { Checkbox } from '../ui/checkbox'
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'
import { Play, SettingsIcon, RefreshCw } from 'lucide-react'
import TestcaseSettingsDialog from './TestcaseSettingsDialog'

function TestcaseList({testCases}: {testCases: TestCase[]}) {
    const [selectedTestCases, setSelectedTestCases] = React.useState<TestCase[]>([]);
    const handleRunSelected = () => {
        
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
            {testCase.status=='failed' && <Badge variant="destructive" className="bg-red-500 text-white"> {testCase.status}</Badge>}
            {testCase.status=='passed' && <Badge variant="default" className="bg-green-500 text-white"> {testCase.status}</Badge>}
            {testCase.status=='running' && <Badge variant="default" className="bg-yellow-500 text-white"> {testCase.status}</Badge>}

            <TestcaseSettingsDialog selectedTestCase={testCase} />
          

          </div>
          </div>
        ))}
        <div className="p-4 flex items-center justify-between bg-gray-100">
            <h2> Run Selected Test Cases</h2>
            <Button disabled={!selectedTestCases.length}>
                <Play className="h-4 w-4 mr-2 shimmer-color-emerald-500"> </Play>  Run Selected</Button>
        </div>
      </div>
    </div>
  )
}

export default TestcaseList
*/

import React from 'react'
import { TestCase } from './userRepoList'
import { Checkbox } from '../ui/checkbox'
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'
import { Play } from 'lucide-react'
import TestcaseSettingsDialog from './TestcaseSettingsDialog'
import TestExecutionModal from './TestExecutionModel' // Make sure the path matches your project structure

function TestcaseList({ 
  testCases, 
  repository 
}: { 
  testCases: TestCase[]; 
  repository?: any;
}) {
    const [selectedTestCases, setSelectedTestCases] = React.useState<TestCase[]>([]);
    const [isExecutionModalOpen, setIsExecutionModalOpen] = React.useState(false);

    const handleRunSelected = () => {
        if (selectedTestCases.length > 0) {
            setIsExecutionModalOpen(true);
        }
    };

    const handleSelectedTestCase = (checked: boolean, testCase: TestCase) => {
        if (checked) {
            setSelectedTestCases([...selectedTestCases, testCase]);
        } else {
            setSelectedTestCases(selectedTestCases.filter((t) => t.id !== testCase.id));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lime-500"> Generated Test Cases</h2>
            </div>
            
            <div className="border rounded-md">
                {testCases.map((testCase, index) => ( 
                    <div key={testCase.id || index} className="p-4 border flex items-center justify-between rounded-lg mb-2 dark:bg-slate-900/50">
                        <div className="flex gap-3 items-center">
                            <Checkbox 
                                checked={selectedTestCases.some((item) => item.id === testCase.id)} 
                                onCheckedChange={(checked: boolean) => handleSelectedTestCase(checked, testCase)} 
                            />
                            <div>
                                <h3>{testCase.title}</h3>
                                <p className="text-xs text-gray-500">{testCase.description}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <Badge variant="secondary">{testCase.type}</Badge>
                            {testCase.status === 'failed' && <Badge variant="destructive" className="bg-red-500 text-white">{testCase.status}</Badge>}
                            {testCase.status === 'passed' && <Badge variant="default" className="bg-green-500 text-white">{testCase.status}</Badge>}
                            {testCase.status === 'running' && <Badge variant="default" className="bg-yellow-500 text-white">{testCase.status}</Badge>}

                            <TestcaseSettingsDialog selectedTestCase={testCase} />
                        </div>
                    </div>
                ))}

                <div className="p-4 flex items-center justify-between bg-gray-100">
                    <h2> Run Selected Test Cases</h2>
                    <Button disabled={!selectedTestCases.length} onClick={handleRunSelected}>
                        <Play className="h-4 w-4 mr-2 shimmer-color-emerald-500" />
                        Run Selected ({selectedTestCases.length})
                    </Button>
                </div>
            </div>

            {/* Test Execution Modal */}
            <TestExecutionModal
                isOpen={isExecutionModalOpen}
                onClose={() => setIsExecutionModalOpen(false)}
                testCases={selectedTestCases}
                repository={repository}
            />
        </div>
    )
}

export default TestcaseList
