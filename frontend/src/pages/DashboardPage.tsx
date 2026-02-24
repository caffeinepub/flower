import { useTasks } from '../hooks/useQueries';
import HeroSection from '../components/HeroSection';
import TaskList from '../components/TaskList';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, Loader2, AlertCircle, TrendingUp } from 'lucide-react';
import { TaskStatus } from '../backend';

export default function DashboardPage() {
  const { data: tasks = [], isLoading } = useTasks();

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === TaskStatus.pending).length,
    inProgress: tasks.filter((t) => t.status === TaskStatus.inProgress).length,
    completed: tasks.filter((t) => t.status === TaskStatus.completed).length,
    failed: tasks.filter((t) => t.status === TaskStatus.failed).length,
  };

  const completionRate = stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : '0';

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <HeroSection />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-border/50 bg-gradient-to-br from-card to-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-3xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold mt-1">{stats.pending}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-500/10">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-blue-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold mt-1">{stats.inProgress}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500/10">
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold mt-1">{stats.completed}</p>
              </div>
              <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-red-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-3xl font-bold mt-1">{stats.failed}</p>
              </div>
              <div className="p-3 rounded-full bg-red-500/10">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {stats.total > 0 && (
        <Card className="border-border/50 bg-gradient-to-r from-flowerGreen-500/5 to-botanicalPurple-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold mt-1">{completionRate}%</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>{stats.completed} completed out of {stats.total} total tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
        <TaskList tasks={tasks} isLoading={isLoading} />
      </div>
    </div>
  );
}
