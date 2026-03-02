type SectionPageProps = {
  title: string;
  subtitle: string;
};

export function SectionPage({ title, subtitle }: SectionPageProps) {
  return (
    <section className="mx-auto max-w-5xl rounded-3xl border border-black/5 bg-white/75 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-800">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-slate-600">{subtitle}</p>
    </section>
  );
}
