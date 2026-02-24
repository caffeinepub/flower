import TaskSubmissionForm from '../components/TaskSubmissionForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function SubmitTaskPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Task</h1>
            <p className="text-muted-foreground mt-1">
              Let AI handle your tasks with superhuman speed and precision
            </p>
          </div>
        </div>

        <TaskSubmissionForm />

        <div className="rounded-xl bg-gradient-to-br from-botanicalPurple-500/10 to-flowerGreen-500/10 border border-border/50 p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-lg">💡</span>
            Tips for Better Results
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-flowerGreen-600 font-bold">•</span>
              <span>Be specific and clear about what you want to accomplish</span>
            </li>
            <li className="flex gap-2">
              <span className="text-flowerGreen-600 font-bold">•</span>
              <span>Include relevant context and constraints</span>
            </li>
            <li className="flex gap-2">
              <span className="text-flowerGreen-600 font-bold">•</span>
              <span>Choose the appropriate task type for better categorization</span>
            </li>
            <li className="flex gap-2">
              <span className="text-flowerGreen-600 font-bold">•</span>
              <span>Break down complex tasks into smaller, manageable pieces</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
