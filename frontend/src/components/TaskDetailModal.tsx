import { TaskView, TaskStatus, TaskType } from '../backend';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, Target, User, RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useRefreshTask } from '../hooks/useQueries';
import { toast } from 'sonner';

interface TaskDetailModalProps {
  task: TaskView;
  open: boolean;
  onClose: () => void;
}

const statusConfig = {
  [TaskStatus.pending]: {
    label: 'Pending',
    color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
    icon: Clock,
  },
  [TaskStatus.inProgress]: {
    label: 'In Progress',
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    icon: Loader2,
  },
  [TaskStatus.completed]: {
    label: 'Completed',
    color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    icon: CheckCircle2,
  },
  [TaskStatus.failed]: {
    label: 'Failed',
    color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
    icon: AlertCircle,
  },
};

const taskTypeLabels = {
  [TaskType.maintenance]: 'Maintenance',
  [TaskType.bugFix]: 'Bug Fix',
  [TaskType.featureRequest]: 'Feature Request',
  [TaskType.optimization]: 'Optimization',
};

export default function TaskDetailModal({ task, open, onClose }: TaskDetailModalProps) {
  const { mutate: refreshTask, isPending } = useRefreshTask();
  const statusInfo = statusConfig[task.status];
  const StatusIcon = statusInfo.icon;

  const handleRefresh = () => {
    refreshTask(task.id, {
      onSuccess: () => {
        toast.success('Task status refreshed');
      },
      onError: () => {
        toast.error('Failed to refresh task status');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono">
                  Task #{task.id.toString()}
                </Badge>
                <Badge variant="secondary">{taskTypeLabels[task.taskType]}</Badge>
              </div>
              <DialogTitle className="text-2xl">{task.description}</DialogTitle>
            </div>
            <Badge className={`${statusInfo.color} border flex items-center gap-1 shrink-0`}>
              <StatusIcon className={`h-3 w-3 ${task.status === TaskStatus.inProgress ? 'animate-spin' : ''}`} />
              {statusInfo.label}
            </Badge>
          </div>
          <DialogDescription>Detailed information about this task</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                <span className="font-medium">Priority</span>
              </div>
              <p className="text-lg font-semibold">{task.priority.toString()}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Attempt Count</span>
              </div>
              <p className="text-lg font-semibold">{task.attemptCount.toString()}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium">User Principal</span>
            </div>
            <p className="text-sm font-mono bg-muted/50 p-2 rounded break-all">{task.user.toString()}</p>
          </div>

          {task.result && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Task Result
                </h4>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm whitespace-pre-wrap">{task.result}</p>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={handleRefresh} disabled={isPending} variant="outline" className="gap-2">
              <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
              Refresh Status
            </Button>
            <Button onClick={onClose} className="ml-auto">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
