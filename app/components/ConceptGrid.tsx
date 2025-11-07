const concepts = [
  {
    title: "Intermediate vs Terminal",
    summary: "Intermediate operations build the pipeline lazily. Terminal operations trigger execution and return a result.",
    takeaway: "You can chain multiple intermediate steps, but only one terminal step." 
  },
  {
    title: "Parallel Streams",
    summary: "Leverage multiple CPU cores by switching to `parallelStream()`.",
    takeaway: "Ideal for CPU-bound workloads with stateless operations, but avoid for small datasets." 
  },
  {
    title: "Statelessness",
    summary: "Operations should not depend on mutable shared state.",
    takeaway: "Helps keep pipelines thread-safe and deterministic." 
  },
  {
    title: "Short Circuiting",
    summary: "Operations like `limit`, `findFirst`, `allMatch` stop processing early.",
    takeaway: "Place them as early as possible for big performance wins." 
  }
];

export function ConceptGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {concepts.map((concept) => (
        <article key={concept.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-lg font-semibold text-slate-100">{concept.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{concept.summary}</p>
          <p className="mt-3 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs uppercase tracking-wide text-primary-light">
            {concept.takeaway}
          </p>
        </article>
      ))}
    </section>
  );
}
