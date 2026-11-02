export default function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div className="mb-10 sm:mb-12">
      <h2
        id={id}
        className="text-[2rem] font-light leading-tight tracking-[-0.01em] text-navy-900 sm:text-[2.75rem]"
      >
        {children}
      </h2>
      <span aria-hidden className="mt-5 block h-1 w-20 bg-accent" />
    </div>
  );
}
