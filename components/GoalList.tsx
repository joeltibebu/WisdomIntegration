"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Goal {
  id: string;
  description: string;
  completed: boolean;
  completedAt: Date | string | null;
  createdAt: Date | string;
}

interface GoalListProps {
  childId: string;
  goals: Goal[];
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function GoalList({ childId, goals }: GoalListProps) {
  const router = useRouter();
  const [newDescription, setNewDescription] = useState("");
  const [addError, setAddError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [completeErrors, setCompleteErrors] = useState<Record<string, string>>({});

  async function handleAddGoal(e: React.FormEvent) {
    e.preventDefault();
    setAddError(null);

    if (!newDescription.trim()) {
      setAddError("Goal description is required.");
      return;
    }

    setIsAdding(true);
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, description: newDescription.trim() }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        setAddError(json.error?.message ?? "Failed to add goal. Please try again.");
        return;
      }

      setNewDescription("");
      router.refresh();
    } catch {
      setAddError("Network error. Please try again.");
    } finally {
      setIsAdding(false);
    }
  }

  async function handleMarkComplete(goalId: string) {
    setCompleteErrors((prev) => ({ ...prev, [goalId]: "" }));
    setCompletingId(goalId);
    try {
      const res = await fetch(`/api/goals/${goalId}/complete`, {
        method: "PATCH",
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        setCompleteErrors((prev) => ({
          ...prev,
          [goalId]: json.error?.message ?? "Failed to mark goal complete.",
        }));
        return;
      }

      router.refresh();
    } catch {
      setCompleteErrors((prev) => ({
        ...prev,
        [goalId]: "Network error. Please try again.",
      }));
    } finally {
      setCompletingId(null);
    }
  }

  const incomplete = goals.filter((g) => !g.completed);
  const complete = goals.filter((g) => g.completed);

  return (
    <div className="space-y-6">
      {/* Add Goal form */}
      <Card header={<h3 className="text-base font-semibold text-wisdom-text">Add New Goal</h3>}>
        <form onSubmit={handleAddGoal} noValidate className="flex gap-3 items-start flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor={`new-goal-${childId}`} className="sr-only">
              Goal description
            </label>
            <input
              id={`new-goal-${childId}`}
              type="text"
              placeholder="Enter goal description…"
              value={newDescription}
              onChange={(e) => {
                setNewDescription(e.target.value);
                if (addError) setAddError(null);
              }}
              disabled={isAdding}
              aria-describedby={addError ? `add-goal-error-${childId}` : undefined}
              aria-invalid={addError ? true : undefined}
              className={[
                "w-full rounded-lg border border-wisdom-border bg-white px-4 py-2.5 text-base text-wisdom-text placeholder:text-wisdom-muted",
                "focus:outline-none focus:ring-2 focus:ring-wisdom-blue focus:border-wisdom-blue transition-colors min-h-[44px]",
                addError ? "border-red-500 focus:ring-red-500" : "",
                isAdding ? "opacity-50 cursor-not-allowed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            {addError && (
              <p id={`add-goal-error-${childId}`} role="alert" className="mt-1 text-sm text-red-600">
                {addError}
              </p>
            )}
          </div>
          <Button type="submit" variant="secondary" isLoading={isAdding} disabled={isAdding}>
            Add Goal
          </Button>
        </form>
      </Card>

      {/* Incomplete goals */}
      <section aria-labelledby={`incomplete-goals-${childId}`}>
        <h3
          id={`incomplete-goals-${childId}`}
          className="text-sm font-semibold text-wisdom-muted uppercase tracking-wide mb-3"
        >
          Active Goals
        </h3>
        {incomplete.length === 0 ? (
          <Card>
            <p className="text-sm text-wisdom-muted text-center py-4">No active goals.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {incomplete.map((goal) => (
              <Card key={goal.id}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-wisdom-text">{goal.description}</p>
                    <p className="text-xs text-wisdom-muted">Added {formatDate(goal.createdAt)}</p>
                    {completeErrors[goal.id] && (
                      <p role="alert" className="text-xs text-red-600">
                        {completeErrors[goal.id]}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkComplete(goal.id)}
                    isLoading={completingId === goal.id}
                    disabled={completingId === goal.id}
                  >
                    Mark Complete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Completed goals */}
      {complete.length > 0 && (
        <section aria-labelledby={`complete-goals-${childId}`}>
          <h3
            id={`complete-goals-${childId}`}
            className="text-sm font-semibold text-wisdom-muted uppercase tracking-wide mb-3"
          >
            Completed Goals
          </h3>
          <div className="space-y-3">
            {complete.map((goal) => (
              <Card key={goal.id}>
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-wisdom-green shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="space-y-0.5">
                    <p className="text-sm text-wisdom-text line-through opacity-70">{goal.description}</p>
                    {goal.completedAt && (
                      <p className="text-xs text-wisdom-muted">
                        Completed {formatDate(goal.completedAt)}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
