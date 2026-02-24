import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Principal "mo:core/Principal";

actor {
  type TaskType = {
    #maintenance;
    #featureRequest;
    #bugFix;
    #optimization;
  };

  type TaskStatus = {
    #pending;
    #inProgress;
    #completed;
    #failed;
  };

  type Task = {
    id : Nat;
    user : Principal;
    description : Text;
    taskType : TaskType;
    priority : Nat;
    status : TaskStatus;
    attemptCount : Nat;
    result : ?Text;
  };

  type TaskView = {
    id : Nat;
    user : Principal;
    description : Text;
    taskType : TaskType;
    priority : Nat;
    status : TaskStatus;
    attemptCount : Nat;
    result : ?Text;
  };

  type HistoricalTask = {
    id : Nat;
    user : Principal;
    description : Text;
    taskType : TaskType;
    priority : Nat;
    status : TaskStatus;
    result : ?Text;
  };

  let tasks = Map.empty<Nat, Task>();
  let archivedTasks = Map.empty<Nat, HistoricalTask>();
  var nextTaskId = 0;

  func hasAtLeastOneTaskAttempt(taskIds : [Nat]) : Bool {
    taskIds.any(func(taskId) { hasTaskAttempt(taskId) });
  };

  func hasTaskAttempt(taskId : Nat) : Bool {
    switch (tasks.get(taskId)) {
      case (null) { false };
      case (?task) { task.attemptCount > 0 };
    };
  };

  func getAttemptCount(taskId : Nat) : Nat {
    switch (tasks.get(taskId)) {
      case (null) { 0 };
      case (?task) { task.attemptCount };
    };
  };

  func sumAttemptCounts(taskIds : [Nat]) : Nat {
    taskIds.foldLeft(
      0,
      func(acc, taskId) {
        acc + getAttemptCount(taskId);
      },
    );
  };

  func toAttemptCount(taskId : Nat) : Nat {
    switch (tasks.get(taskId)) {
      case (null) { 0 };
      case (?task) { task.attemptCount };
    };
  };

  func getAttemptCountsForTasks(taskIds : [Nat]) : [Nat] {
    taskIds.map(toAttemptCount);
  };

  func isUnusedTask(taskId : Nat) : Bool {
    switch (tasks.get(taskId)) {
      case (null) { false };
      case (?task) { task.attemptCount == 0 };
    };
  };

  func getUnusedTaskCount(taskIds : [Nat]) : Nat {
    taskIds.filter(isUnusedTask).size();
  };

  func isValidTaskId(taskId : Nat) : Bool {
    switch (tasks.get(taskId), archivedTasks.get(taskId)) {
      case (null, null) { false };
      case (_) { true };
    };
  };

  func toTaskView(task : Task) : TaskView {
    {
      id = task.id;
      user = task.user;
      description = task.description;
      taskType = task.taskType;
      priority = task.priority;
      status = task.status;
      attemptCount = task.attemptCount;
      result = task.result;
    };
  };

  public shared ({ caller }) func createTask(description : Text, taskType : TaskType) : async Nat {
    let taskId = nextTaskId;
    nextTaskId += 1;

    let task : Task = {
      id = taskId;
      user = caller;
      description;
      taskType;
      priority = 5;
      status = #pending;
      attemptCount = 0;
      result = null;
    };

    tasks.add(taskId, task);
    taskId;
  };

  public query ({ caller }) func getTask(taskId : Nat) : async TaskView {
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) { toTaskView(task) };
    };
  };

  public shared ({ caller }) func updateTaskStatus(taskId : Nat, status : TaskStatus) : async () {
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) {
        let updatedTask : Task = {
          id = task.id;
          user = task.user;
          description = task.description;
          taskType = task.taskType;
          priority = task.priority;
          attemptCount = task.attemptCount;
          result = task.result;
          status;
        };
        tasks.add(taskId, updatedTask);
      };
    };
  };

  public shared ({ caller }) func incrementAttemptCount(taskId : Nat) : async () {
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) {
        let updatedTask : Task = {
          id = task.id;
          user = task.user;
          description = task.description;
          taskType = task.taskType;
          priority = task.priority;
          status = task.status;
          result = task.result;
          attemptCount = task.attemptCount + 1;
        };
        tasks.add(taskId, updatedTask);
      };
    };
  };

  public shared ({ caller }) func setTaskResult(taskId : Nat, result : Text) : async () {
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) {
        let updatedTask = {
          id = task.id;
          user = task.user;
          description = task.description;
          taskType = task.taskType;
          priority = task.priority;
          attemptCount = task.attemptCount;
          status = task.status;
          result = ?result;
        };
        tasks.add(taskId, updatedTask);
      };
    };
  };

  public shared ({ caller }) func archiveTask(taskId : Nat) : async () {
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) {
        let archivedTask : HistoricalTask = {
          id = task.id;
          user = task.user;
          description = task.description;
          taskType = task.taskType;
          priority = task.priority;
          status = task.status;
          result = task.result;
        };
        archivedTasks.add(taskId, archivedTask);
        tasks.remove(taskId);
      };
    };
  };

  public query ({ caller }) func getArchivedTask(taskId : Nat) : async HistoricalTask {
    switch (archivedTasks.get(taskId)) {
      case (null) { Runtime.trap("Archived task not found") };
      case (?task) { task };
    };
  };

  func isValidHistoricalTaskId(taskId : Nat) : Bool {
    switch (archivedTasks.get(taskId)) {
      case (null) { false };
      case (_) { true };
    };
  };

  func validTaskId(taskId : Nat) : Nat {
    if (isValidTaskId(taskId)) { taskId } else { 0 };
  };

  public query ({ caller }) func isArchivedTaskId(taskId : Nat) : async Bool {
    isValidHistoricalTaskId(taskId);
  };

  func toAttemptCountFromArchived(taskId : Nat) : Nat {
    switch (archivedTasks.get(taskId)) {
      case (null) { 0 };
      case (?task) {
        switch (task.result) {
          case (null) { 0 };
          case (_) { 1 };
        };
      };
    };
  };

  func getAttemptCountsForArchivedTasks(taskIds : [Nat]) : [Nat] {
    taskIds.map(toAttemptCountFromArchived);
  };
};
