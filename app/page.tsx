import prisma from "@/lib/db";
import HomeClient from "../components/HomeMaterial";

export const dynamic = "force-dynamic"; // 🚀 Add this line

export default async function HomePage() {
  const movies = await prisma.movie.findMany();
  return <HomeClient movies={movies} />;
}
