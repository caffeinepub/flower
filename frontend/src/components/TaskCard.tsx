import { TaskView, TaskStatus, TaskType } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Clock, Target, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  task: TaskView;
  onClick?: () => void;
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

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const statusInfo = statusConfig[task.status];
  const StatusIcon = statusInfo.icon;

  return (
    <Card
      className="group hover:shadow-lg hover:shadow-flowerGreen-500/10 transition-all duration-300 cursor-pointer border-border/50 hover:border-flowerGreen-500/30 bg-card/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-mono">
                #{task.id.toString()}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {taskTypeLabels[task.taskType]}
              </Badge>
            </div>
            <CardTitle className="text-base line-clamp-2 group-hover:text-flowerGreen-600 dark:group-hover:text-flowerGreen-400 transition-colors">
              {task.description}
            </CardTitle>
          </div>
          <Badge className={`${statusInfo.color} border flex items-center gap-1 shrink-0`}>
            <StatusIcon className={`h-3 w-3 ${task.status === TaskStatus.inProgress ? 'animate-spin' : ''}`} />
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>Priority: {task.priority.toString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Attempts: {task.attemptCount.toString()}</span>
          </div>
        </div>

        {task.result && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                <span className="text-xs font-medium">View Result</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                <p className="text-muted-foreground whitespace-pre-wrap">{task.result}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
