import { Toggle } from "./toggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 md:px-12">
      <h1 className="text-3xl font-bold">BookHive 📚</h1>
      <div className="flex gap-2 items-center">
        <Toggle />
        <button className="bg-indigo-500 hover:bg-indigo-600 py-1 px-2 rounded-lg">
          Get Started
        </button>
      </div>
    </header>
  );
}
