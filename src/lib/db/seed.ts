import db from "./prisma";

const userId = "67b1b16e8f2dd8b38edd2208";

const books = [
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    description:
      "A spiritual guide that teaches mindfulness and how to live in the present moment, letting go of past regrets and future anxieties.",
    coverImage:
      "https://ik.imagekit.io/gauravsahu/bookhive/the_power_of_now.jpg",
    category: "Self-Help",
    userId,
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    description:
      "The inspiring autobiography of a Navy SEAL who overcame poverty, abuse, and obesity through sheer mental toughness and discipline.",
    coverImage:
      "https://ik.imagekit.io/gauravsahu/bookhive/cant_hurt_me.jpg?updatedAt=1739708207384",
    category: "Motivation",
    userId,
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    description:
      "A counterintuitive self-help book that argues happiness comes from embracing life’s struggles rather than avoiding them.",
    coverImage:
      "https://ik.imagekit.io/gauravsahu/bookhive/the_subtle_art_of_not_giving_fuck.jpg",
    category: "Self-Help",
    userId,
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    description:
      "Explores the power of focused, distraction-free work in an age of constant digital interruptions, offering strategies for improving productivity.",
    coverImage: "https://ik.imagekit.io/gauravsahu/bookhive/deep_work.jpg",
    category: "Productivity",
    userId,
  },
  {
    title: "The 5 AM Club",
    author: "Robin Sharma",
    description:
      "A book that promotes waking up at 5 AM as a habit for success, providing a structured morning routine to maximize productivity.",
    coverImage: "https://ik.imagekit.io/gauravsahu/bookhive/the_5_am_club.jpg",
    category: "Personal Development",
    userId,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  await db.book.createMany({
    data: books,
  });

  console.log("✅ Seeding completed!");
  await db.$disconnect();
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  db.$disconnect();
  process.exit(1);
});
