import { TaskView, TaskStatus, TaskType } from '../backend';
import TaskCard from './TaskCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { Filter, Inbox } from 'lucide-react';
import TaskDetailModal from './TaskDetailModal';

interface TaskListProps {
  tasks: TaskView[];
  isLoading?: boolean;
}

export default function TaskList({ tasks, isLoading }: TaskListProps) {
  const [selectedTaskType, setSelectedTaskType] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<TaskView | null>(null);

  const filterByStatus = (status?: TaskStatus) => {
    let filtered = tasks;
    if (status) {
      filtered = filtered.filter((task) => task.status === status);
    }
    if (selectedTaskType !== 'all') {
      filtered = filtered.filter((task) => task.taskType === selectedTaskType);
    }
    return filtered;
  };

  const allTasks = filterByStatus();
  const pendingTasks = filterByStatus(TaskStatus.pending);
  const inProgressTasks = filterByStatus(TaskStatus.inProgress);
  const completedTasks = filterByStatus(TaskStatus.completed);
  const failedTasks = filterByStatus(TaskStatus.failed);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted/50 p-6 mb-4">
        <Inbox className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );

  const TaskGrid = ({ tasks }: { tasks: TaskView[] }) => {
    if (tasks.length === 0) {
      return <EmptyState message="No tasks match your current filters." />;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id.toString()} task={task} onClick={() => setSelectedTask(task)} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedTaskType} onValueChange={setSelectedTaskType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value={TaskType.maintenance}>Maintenance</SelectItem>
                <SelectItem value={TaskType.bugFix}>Bug Fix</SelectItem>
                <SelectItem value={TaskType.featureRequest}>Feature Request</SelectItem>
                <SelectItem value={TaskType.optimization}>Optimization</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="all">All ({allTasks.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress ({inProgressTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
            <TabsTrigger value="failed">Failed ({failedTasks.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <TaskGrid tasks={allTasks} />
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <TaskGrid tasks={pendingTasks} />
          </TabsContent>
          <TabsContent value="inProgress" className="mt-6">
            <TaskGrid tasks={inProgressTasks} />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <TaskGrid tasks={completedTasks} />
          </TabsContent>
          <TabsContent value="failed" className="mt-6">
            <TaskGrid tasks={failedTasks} />
          </TabsContent>
        </Tabs>
      </div>

      {selectedTask && <TaskDetailModal task={selectedTask} open={!!selectedTask} onClose={() => setSelectedTask(null)} />}
    </>
  );
}
