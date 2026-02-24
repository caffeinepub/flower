import { useState } from 'react';
import { TaskType } from '../backend';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateTask } from '../hooks/useQueries';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

const taskTypeOptions = [
  { value: TaskType.maintenance, label: 'Maintenance', description: 'System upkeep and routine tasks' },
  { value: TaskType.bugFix, label: 'Bug Fix', description: 'Resolve issues and errors' },
  { value: TaskType.featureRequest, label: 'Feature Request', description: 'New functionality or improvements' },
  { value: TaskType.optimization, label: 'Optimization', description: 'Performance and efficiency enhancements' },
];

export default function TaskSubmissionForm() {
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState<TaskType>(TaskType.featureRequest);
  const { mutate: createTask, isPending } = useCreateTask();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    if (description.trim().length < 10) {
      toast.error('Task description must be at least 10 characters');
      return;
    }

    createTask(
      { description: description.trim(), taskType },
      {
        onSuccess: (taskId) => {
          toast.success(`Task #${taskId.toString()} created successfully!`);
          setDescription('');
          setTimeout(() => {
            navigate({ to: '/' });
          }, 1000);
        },
        onError: (error) => {
          toast.error(`Failed to create task: ${error.message}`);
        },
      }
    );
  };

  return (
    <Card className="border-border/50 shadow-xl shadow-flowerGreen-500/5">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-flowerGreen-500/10 to-botanicalPurple-500/10">
            <Sparkles className="h-5 w-5 text-flowerGreen-600" />
          </div>
          <CardTitle className="text-2xl">Submit New Task</CardTitle>
        </div>
        <CardDescription>
          Describe your task in natural language. Our AI will process and execute it with superhuman speed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="taskType">Task Type</Label>
            <Select value={taskType} onValueChange={(value) => setTaskType(value as TaskType)}>
              <SelectTrigger id="taskType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {taskTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Task Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you need done... For example: 'Analyze the performance metrics and generate a comprehensive report' or 'Optimize the database queries for faster response times'"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="resize-none"
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              {description.length} characters (minimum 10 required)
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPending || !description.trim() || description.trim().length < 10}
            className="w-full gap-2 bg-gradient-to-r from-flowerGreen-500 to-flowerGreen-600 hover:from-flowerGreen-600 hover:to-flowerGreen-700 text-white shadow-lg shadow-flowerGreen-500/30"
            size="lg"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Task...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Task
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
