import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HistoricalTask {
    id: bigint;
    status: TaskStatus;
    result?: string;
    user: Principal;
    description: string;
    taskType: TaskType;
    priority: bigint;
}
export interface TaskView {
    id: bigint;
    status: TaskStatus;
    result?: string;
    user: Principal;
    description: string;
    attemptCount: bigint;
    taskType: TaskType;
    priority: bigint;
}
export enum TaskStatus {
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress",
    failed = "failed"
}
export enum TaskType {
    maintenance = "maintenance",
    bugFix = "bugFix",
    featureRequest = "featureRequest",
    optimization = "optimization"
}
export interface backendInterface {
    archiveTask(taskId: bigint): Promise<void>;
    createTask(description: string, taskType: TaskType): Promise<bigint>;
    getArchivedTask(taskId: bigint): Promise<HistoricalTask>;
    getTask(taskId: bigint): Promise<TaskView>;
    incrementAttemptCount(taskId: bigint): Promise<void>;
    isArchivedTaskId(taskId: bigint): Promise<boolean>;
    setTaskResult(taskId: bigint, result: string): Promise<void>;
    updateTaskStatus(taskId: bigint, status: TaskStatus): Promise<void>;
}
