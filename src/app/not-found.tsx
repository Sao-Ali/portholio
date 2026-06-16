import BackButton from "@/components/back-button";
import SiteHeader from "@/components/site-header";

export default function NotFound() {
  return (
    <main className="mx-auto mt-8 max-w-xl px-6 md:px-0">
      <section>
        <SiteHeader />
        <BackButton />
        <section>
          <h1 className="text-2xl font-semibold tracking-tighter">
            404 - Page Not Found
          </h1>
          <p className="mt-4 text-gray">This page does not exist.</p>
        </section>
      </section>
    </main>
  );
}
