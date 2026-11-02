import Container from "./Container";
import { ChevronRight, ChevronUp } from "./icons";
import { textLink } from "./ui";

export default function NeedMoreAnswers() {
  return (
    <section aria-labelledby="more-title" className="pb-16">
      <Container>
        <h2 id="more-title" className="text-2xl font-light text-navy-900 sm:text-[1.75rem]">
          Need more answers?
        </h2>
        <a href="#" className={`${textLink} mt-4`}>
          Visit the Harbor help centre <ChevronRight className="h-4 w-4 text-accent" />
        </a>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="#" className="hover:text-navy-900">Harbor</a>
              </li>
              <li aria-hidden>/</li>
              <li>
                <a href="#" className="hover:text-navy-900">Invest</a>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-navy-900">Managed investing</li>
            </ol>
          </nav>
          <a href="#top" className="inline-flex items-center gap-2 text-navy-900 hover:text-accent">
            Back to top <ChevronUp />
          </a>
        </div>
      </Container>
    </section>
  );
}
