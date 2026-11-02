export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1290px] px-5 sm:px-8 ${className}`}>{children}</div>;
}
