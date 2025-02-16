import HomeImage from "@/components/home-image";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <main className="flex flex-col items-center text-center px-6 mt-24">
        <h1 className="text-4xl font-bold md:text-6xl">
          Discover. Review. Recommend.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl">
          Your ultimate destination for book lovers. Read reviews, rate books,
          and share recommendations with the community.
        </p>

        <HomeImage
          lightImage="/showcase/light/bookhive.png"
          darkImage="/showcase/dark/bookhive.png"
          alt="bookhive"
        />
      </main>

      <section className="md:mt-24 px-6 md:px-12 md:h-96 h-[70vh] flex md:items-center md:justify-center flex-col">
        <h3 className="text-3xl font-semibold text-center">
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

      <section className="flex flex-col items-center justify-center w-full h-[60vh] md:h-screen px-8 md:gap-4 text-center">
        <div>
          <h1 className="text-4xl font-bold md:text-6xl">Explore BookHive</h1>
          <p className="text-lg text-gray-300 max-w-2xl my-4">
            Discover, review, and rate books effortlessly with BookHive. Our
            intuitive interface makes it easy to find and share your favorite
            reads.
          </p>
        </div>

        <HomeImage
          lightImage="/showcase/light/bookhive-demo.png"
          darkImage="/showcase/dark/bookhive-demo.png"
          alt="BookHive Demo"
        />
      </section>

      <section className="flex flex-col items-center justify-center w-full h-[60vh] md:h-screen px-8 md:gap-4 text-center">
        <div>
          <h1 className="text-4xl font-bold md:text-6xl">Add. Read. Reviews</h1>
          <p className="text-lg text-gray-300 max-w-2xl my-4">
            Read reviews, add, and delete reviews effortlessly with BookHive.
            Read honest reviews from real readers and share your favorite reads.
          </p>
        </div>

        <HomeImage
          lightImage="/showcase/light/bookhive-reviews.png"
          darkImage="/showcase/dark/bookhive-reviews.png"
          alt="BookHive Reviews"
        />
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
    <div className="p-6 rounded-xl  dark:bg-black bg-slate-50 shadow-md text-center">
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
}
