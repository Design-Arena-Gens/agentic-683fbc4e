import { ConceptGrid } from "./components/ConceptGrid";
import { StreamCheatsheet } from "./components/StreamCheatsheet";
import { StreamPlayground } from "./components/StreamPlayground";

const pipelineExamples = [
  {
    title: "Customer segmentation",
    context: "Group customers by lifecycle value and return the top N loyal customers.",
    snippet: `Map<String, Double> loyalCustomers = customers.stream()
    .filter(customer -> customer.isActive())
    .filter(customer -> customer.getPurchases() > 5)
    .sorted(comparing(Customer::getLifetimeValue).reversed())
    .limit(10)
    .collect(toMap(Customer::getEmail, Customer::getLifetimeValue));`,
    stages: [
      {
        label: "filter",
        detail: "Keep only active customers"
      },
      {
        label: "filter",
        detail: "Keep customers with > 5 purchases"
      },
      {
        label: "sorted",
        detail: "Sort by lifetime value descending"
      },
      {
        label: "limit",
        detail: "Take the top 10"
      },
      {
        label: "collect",
        detail: "Materialize into a map with the latest value"
      }
    ]
  },
  {
    title: "Incident triage",
    context: "Aggregate open incidents grouped by severity and ordered by response SLA.",
    snippet: `Map<Severity, Long> incidentsBySeverity = incidents.stream()
    .filter(Incident::isOpen)
    .sorted(comparing(Incident::getSlaTarget))
    .collect(groupingBy(Incident::getSeverity, counting()));`,
    stages: [
      {
        label: "filter",
        detail: "Ignore resolved incidents"
      },
      {
        label: "sorted",
        detail: "Order by SLA target"
      },
      {
        label: "collect",
        detail: "Group by severity and count"
      }
    ]
  }
];

export default function Page() {
  return (
    <main className="space-y-12">
      <header className="space-y-6">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full border border-primary/60 bg-primary/10 px-4 py-1 text-xs uppercase tracking-wide text-primary-light">
            Master the Stream API
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Java Stream Explorer
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Understand the Java Stream API visually, experiment with pipelines, and ship safer production code. Built for backend engineers leveling up to functional pipelines.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <a
            href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-200 hover:border-primary/50 hover:text-primary-light"
          >
            Official docs
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
            Lazy evaluation visualized
          </span>
        </div>
      </header>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-50">Pipeline blueprints</h2>
          <p className="text-sm text-slate-400">Battle-tested usage patterns you can adapt to your domain.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {pipelineExamples.map((example) => (
            <article key={example.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-100">{example.title}</h3>
                <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs uppercase tracking-wide text-slate-400">
                  Blueprint
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{example.context}</p>
              <pre className="mt-4 whitespace-pre-wrap text-xs text-slate-200">
                <code>{example.snippet}</code>
              </pre>
              <div className="mt-5 space-y-2">
                {example.stages.map((stage, index) => (
                  <div key={`${example.title}-stage-${index}`} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/90 p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary-light">
                      {index + 1}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-100">{stage.label}</p>
                      <p className="text-xs text-slate-400">{stage.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ConceptGrid />

      <StreamPlayground />

      <StreamCheatsheet />

      <footer className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
        <p>
          Need more depth? Pair Streams with the Collector API, record patterns, and pattern matching to unlock declarative data pipelines. Keep operations stateless, rely on immutable DTOs, and profile before switching to parallel streams.
        </p>
      </footer>
    </main>
  );
}
