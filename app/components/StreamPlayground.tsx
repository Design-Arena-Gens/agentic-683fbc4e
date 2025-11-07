"use client";

import { useMemo, useState } from "react";

type OperationId =
  | "filter"
  | "map"
  | "sorted"
  | "distinct"
  | "limit"
  | "peek"
  | "reduce";

type DatasetId = "numbers" | "words";

interface Operation {
  id: OperationId;
  label: string;
  description: string;
}

const DATASETS: Record<DatasetId, { label: string; source: string; data: (number | string)[] }> = {
  numbers: {
    label: "Sales per Day",
    source: "List<Integer> sales = List.of(12, 5, 18, 23, 18, 9, 30);",
    data: [12, 5, 18, 23, 18, 9, 30]
  },
  words: {
    label: "Customer Feedback",
    source: "List<String> comments = List.of(\"fast\", \"friendly\", \"friendly\", \"clean\", \"fast\");",
    data: ["fast", "friendly", "friendly", "clean", "fast"]
  }
};

const OPERATIONS: Operation[] = [
  {
    id: "filter",
    label: "filter",
    description: "Keep elements that match a predicate"
  },
  {
    id: "map",
    label: "map",
    description: "Transform each element"
  },
  {
    id: "peek",
    label: "peek",
    description: "Log intermediate values without changing them"
  },
  {
    id: "sorted",
    label: "sorted",
    description: "Sort elements using their natural order"
  },
  {
    id: "distinct",
    label: "distinct",
    description: "Remove duplicates"
  },
  {
    id: "limit",
    label: "limit",
    description: "Take the first n elements"
  },
  {
    id: "reduce",
    label: "reduce",
    description: "Collapse elements into a single result"
  }
];

const OP_DESCRIPTIONS: Record<OperationId, string> = {
  filter: "sales -> sales >= 10",
  map: "sales -> sales * 1.2",
  sorted: "natural order",
  distinct: "remove duplicates",
  limit: "take first 3",
  peek: "System.out::println",
  reduce: "Integer::sum"
};

function applyOperations(dataset: DatasetId, pipeline: OperationId[]) {
  let working = [...DATASETS[dataset].data];
  const logs: Array<{ op: OperationId; snapshot: (number | string)[] }> = [];
  let reduced: number | string | null = null;

  for (const op of pipeline) {
    switch (op) {
      case "filter":
        working = working.filter((item) => {
          if (typeof item === "number") {
            return item >= 10;
          }
          if (typeof item === "string") {
            return item.length >= 5;
          }
          return true;
        });
        logs.push({ op, snapshot: [...working] });
        break;
      case "map":
        working = working.map((item) => {
          if (typeof item === "number") {
            return Math.round(item * 1.2 * 10) / 10;
          }
          if (typeof item === "string") {
            return item.toUpperCase();
          }
          return item;
        });
        logs.push({ op, snapshot: [...working] });
        break;
      case "peek":
        logs.push({ op, snapshot: [...working] });
        break;
      case "sorted":
        working = [...working].sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        logs.push({ op, snapshot: [...working] });
        break;
      case "distinct":
        working = Array.from(new Set(working));
        logs.push({ op, snapshot: [...working] });
        break;
      case "limit":
        working = working.slice(0, 3);
        logs.push({ op, snapshot: [...working] });
        break;
      case "reduce":
        if (typeof working[0] === "number") {
          reduced = (working as number[]).reduce((acc, curr) => acc + curr, 0);
        } else if (typeof working[0] === "string") {
          reduced = (working as string[]).reduce((acc, curr) => `${acc}, ${curr}`);
        }
        logs.push({ op, snapshot: reduced !== null ? [reduced] : [] });
        break;
    }
  }

  return { result: reduced ?? working, logs };
}

export function StreamPlayground() {
  const [dataset, setDataset] = useState<DatasetId>("numbers");
  const [pipeline, setPipeline] = useState<OperationId[]>(["filter", "map", "peek", "distinct", "sorted"]);
  const { result, logs } = useMemo(() => applyOperations(dataset, pipeline), [dataset, pipeline]);

  const toggleOperation = (id: OperationId) => {
    setPipeline((current) => {
      if (current.includes(id)) {
        return current.filter((op) => op !== id);
      }
      const order = OPERATIONS.map((op) => op.id);
      const next = [...current, id].sort((a, b) => order.indexOf(a) - order.indexOf(b));
      return next;
    });
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-50">Stream Pipeline Playground</h2>
            <p className="text-sm text-slate-300">
              Combine intermediate operations and observe how data flows through a Java Stream.
            </p>
          </div>
          <label className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-200">
            Dataset
            <select
              value={dataset}
              onChange={(event) => setDataset(event.target.value as DatasetId)}
              className="rounded-full bg-transparent text-sm focus:outline-none"
            >
              {Object.entries(DATASETS).map(([id, value]) => (
                <option key={id} value={id} className="bg-slate-900 text-slate-100">
                  {value.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-wide text-slate-500">Source</p>
          <code className="mt-2 block text-slate-100">{DATASETS[dataset].source}</code>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {OPERATIONS.map((operation) => {
            const active = pipeline.includes(operation.id);
            return (
              <button
                key={operation.id}
                type="button"
                onClick={() => toggleOperation(operation.id)}
                className={`rounded-xl border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950 ${
                  active
                    ? "border-primary/70 bg-primary/10 text-primary-light"
                    : "border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700"
                }`}
              >
                <span className="font-semibold text-slate-100">{operation.label}</span>
                <p className="mt-1 text-xs text-slate-400">{operation.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h3 className="text-lg font-semibold text-slate-50">Pipeline Trace</h3>
        <div className="space-y-3 text-sm">
          {logs.length === 0 ? (
            <p className="text-slate-400">Select operations to see how the stream evolves.</p>
          ) : (
            logs.map((entry, index) => (
              <div key={`${entry.op}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">{index + 1}. {entry.op}</p>
                <p className="mt-1 text-slate-100">{JSON.stringify(entry.snapshot)}</p>
                <p className="mt-1 text-xs text-slate-500">{OP_DESCRIPTIONS[entry.op]}</p>
              </div>
            ))
          )}
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Result</p>
          <p className="mt-2 text-base font-semibold text-primary-light">
            {Array.isArray(result) ? JSON.stringify(result) : result}
          </p>
        </div>
      </div>
    </section>
  );
}
