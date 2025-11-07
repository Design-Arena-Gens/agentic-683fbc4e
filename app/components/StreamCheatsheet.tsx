const entries = [
  {
    method: "filter(Predicate<T>)",
    type: "Intermediate",
    use: "Keep elements that satisfy a condition",
    tip: "Combine with `distinct` to remove noise first."
  },
  {
    method: "map(Function<T, R>)",
    type: "Intermediate",
    use: "Transform each element",
    tip: "Use `mapToInt`/`mapToLong` for primitive streams."
  },
  {
    method: "flatMap(Function<T, Stream<R>>)",
    type: "Intermediate",
    use: "Flatten nested collections",
    tip: "Great for data mapping or JSON parsing."
  },
  {
    method: "sorted(Comparator<T>)",
    type: "Intermediate",
    use: "Sort elements",
    tip: "Sorting after `map` can avoid expensive comparisons."
  },
  {
    method: "distinct()",
    type: "Intermediate",
    use: "Remove duplicates",
    tip: "Runs in O(n) with hashing, ensure proper `equals`/`hashCode`."
  },
  {
    method: "limit(long maxSize)",
    type: "Intermediate",
    use: "Short circuit after N elements",
    tip: "Pair with `sorted` or `skip` for pagination."
  },
  {
    method: "collect(Collector<T, A, R>)",
    type: "Terminal",
    use: "Materialize the stream",
    tip: "Try `Collectors.groupingBy` for aggregations."
  },
  {
    method: "reduce(BinaryOperator<T>)",
    type: "Terminal",
    use: "Fold into a single value",
    tip: "Use identity overload to avoid dealing with Optional."
  },
  {
    method: "toList()",
    type: "Terminal",
    use: "Convenience collector (Java 16+)",
    tip: "Immutable result, prefer over `collect(Collectors.toList())`."
  }
];

export function StreamCheatsheet() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-50">Stream Method Cheatsheet</h2>
          <p className="text-sm text-slate-400">Common operations with production-ready tips.</p>
        </div>
        <span className="rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-xs uppercase tracking-wide text-primary-light">
          Production ready
        </span>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 text-sm text-slate-200">
          <thead className="text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="rounded-l-xl bg-slate-900/80 px-4 py-3 text-left">Method</th>
              <th className="bg-slate-900/80 px-4 py-3 text-left">Stage</th>
              <th className="bg-slate-900/80 px-4 py-3 text-left">Use Case</th>
              <th className="rounded-r-xl bg-slate-900/80 px-4 py-3 text-left">Pro Tip</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.method} className="rounded-xl border border-slate-800 bg-slate-950/80 text-sm">
                <td className="rounded-l-xl px-4 py-3 font-mono text-slate-100">{entry.method}</td>
                <td className="px-4 py-3 text-slate-400">{entry.type}</td>
                <td className="px-4 py-3 text-slate-100">{entry.use}</td>
                <td className="rounded-r-xl px-4 py-3 text-slate-300">{entry.tip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
