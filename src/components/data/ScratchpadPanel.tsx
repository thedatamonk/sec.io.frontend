interface ScratchpadTask {
  task_id: string;
  assigned_to: string;
  description: string;
  status: string;
}

interface RevisionEntry {
  timestamp: string;
  reason: string;
}

interface ScratchpadPanelProps {
  scratchpad: Record<string, unknown>;
}

const STATUS_STYLES: Record<string, string> = {
  COMPLETED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  ACTIVE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  PENDING: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  FAILED: "bg-red-500/20 text-red-400 border-red-500/30",
  SKIPPED: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

function StatusBadge({ status }: { status: string }) {
  const styles = STATUS_STYLES[status.toUpperCase()] ?? STATUS_STYLES.PENDING;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}

export function ScratchpadPanel({ scratchpad }: ScratchpadPanelProps) {
  const goal = scratchpad.goal as string | undefined;
  const tasks = (scratchpad.tasks as ScratchpadTask[]) ?? [];
  const revisions = (scratchpad.revision_history as RevisionEntry[]) ?? [];

  const isEmpty = !goal && tasks.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm gap-2 p-8">
        <p>No agent plan data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 overflow-auto">
      {goal && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Goal
          </p>
          <p className="text-sm text-foreground">{goal}</p>
        </div>
      )}

      {tasks.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Tasks
          </p>
          <div className="rounded-md border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground w-20">
                    ID
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground w-28">
                    Assigned To
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">
                    Description
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground w-24">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, i) => (
                  <tr
                    key={task.task_id ?? i}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-3 py-2 text-xs text-muted-foreground font-mono">
                      {task.task_id}
                    </td>
                    <td className="px-3 py-2 text-xs">{task.assigned_to}</td>
                    <td className="px-3 py-2 text-xs">{task.description}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={task.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {revisions.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Revision History
          </p>
          <div className="flex flex-col gap-2">
            {revisions.map((entry, i) => (
              <div
                key={i}
                className="flex gap-3 text-xs border-l-2 border-border pl-3 py-1"
              >
                <span className="text-muted-foreground shrink-0 font-mono">
                  {entry.timestamp}
                </span>
                <span className="text-foreground">{entry.reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
