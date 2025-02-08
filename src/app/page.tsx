export default function Home() {
  return (
    <div className="min-h-screen ">
      <main className="flex flex-col items-center text-center px-6 mt-24">
        <h2 className="text-4xl font-bold md:text-6xl">
          Discover. Review. Recommend.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
          Your ultimate destination for book lovers. Read reviews, rate books,
          and share recommendations with the community.
        </p>
      </main>

      <section className="mt-24 px-6 md:px-12">
        <h3 className="text-2xl font-semibold text-center">
          Why Choose BookHive?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <FeatureCard
            title="Curated Reviews"
            description="Read honest reviews from real readers before picking your next book."
          />
          <FeatureCard
            title="Personalized Recommendations"
            description="Get book suggestions based on your reading history and preferences."
          />
          <FeatureCard
            title="Community Driven"
            description="Engage with fellow book lovers, share insights, and discover hidden gems."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl dark:bg-black bg-slate-50 shadow-md text-center">
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
}
