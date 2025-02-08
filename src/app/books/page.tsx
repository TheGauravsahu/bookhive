import { trpc } from "@/trpc/server";
import React from "react";

export default async function Books() {
  const data = await trpc.hello({ text: "Hello gaurav" });
  return <div className="h-screen p-8">{data.greeting}</div>;
}
