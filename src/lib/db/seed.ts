import db from "./prisma";

const userId = "67b1b16e8f2dd8b38edd2208";

const books = [
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    description:
      "A transformative spiritual guide that emphasizes the importance of living in the present moment. Eckhart Tolle explores the power of mindfulness and self-awareness, helping readers break free from overthinking, anxiety, and the burdens of past regrets and future worries. This book provides deep insights into how letting go of the ego and embracing the 'Now' can lead to true happiness and inner peace.",
    coverImage:
      "https://ik.imagekit.io/gauravsahu/bookhive/the_power_of_now.jpg",
    category: "self-help",
    userId,
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    description:
      "An intense and raw autobiography that chronicles David Goggins' transformation from a troubled childhood filled with poverty, abuse, and self-doubt into becoming a Navy SEAL and one of the toughest endurance athletes in the world. Through mental resilience, discipline, and an unbreakable mindset, Goggins proves that human potential is limitless. This book is a must-read for anyone looking to break past their limits and push beyond mental and physical barriers.",
    coverImage:
      "https://ik.imagekit.io/gauravsahu/bookhive/cant_hurt_me.jpg?updatedAt=1739708207384",
    category: "motivation",
    userId,
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    description:
      "A refreshingly honest self-help book that challenges the traditional idea of relentless positivity. Mark Manson argues that accepting life's struggles and embracing discomfort is the key to real happiness. With a blend of humor, brutal honesty, and deep philosophical insights, this book teaches readers how to focus on what truly matters, let go of unnecessary worries, and build a more fulfilling life by choosing their struggles wisely.",
    coverImage:
      "https://ik.imagekit.io/gauravsahu/bookhive/the_subtle_art_of_not_giving_fuck.jpg",
    category: "self-help",
    userId,
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    description:
      "A must-read book for anyone struggling with distractions in the digital age. Cal Newport introduces the concept of 'Deep Work'—the ability to focus intensely without distractions—which leads to increased productivity and mastery in any field. The book provides practical strategies for developing deep work habits, eliminating shallow work, and maximizing efficiency in both personal and professional life. Essential for students, professionals, and creatives looking to achieve peak performance.",
    coverImage: "https://ik.imagekit.io/gauravsahu/bookhive/deep_work.jpg",
    category: "productivity",
    userId,
  },
  {
    title: "The 5 AM Club",
    author: "Robin Sharma",
    description:
      "A powerful guide that advocates waking up at 5 AM to unlock your full potential. Robin Sharma combines storytelling with self-improvement principles, teaching readers how a well-structured morning routine can enhance productivity, mindset, and overall well-being. The book provides practical steps for building discipline, creating a daily success ritual, and making the most of the early hours to achieve long-term success and fulfillment.",
    coverImage: "https://ik.imagekit.io/gauravsahu/bookhive/the_5_am_club.jpg",
    category: "personal-development",
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
