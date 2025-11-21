import TravellersClient from "./Travellers.client";
import { getAllTravelers } from "@/lib/api/serverApi/getAllTravelers";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Мандрівники | Подорожники",
  description:
    "Каталог мандрівників нашої платформи. Переглядайте профілі, фото та описи користувачів, які діляться своїми подорожами.",
  keywords: [
    "мандрівники",
    "подорожі",
    "туризм",
    "travelers",
    "travel platform",
    "історії подорожей",
  ],
  authors: [{ name: "Shumylo Yana" }],
  robots: {
    index: true,
    follow: true,
  },
  canonical: "http://localhost:3000/travellers",
  openGraph: {
    title: "Мандрівники | Подорожники",
    description:
      "Список мандрівників платформи Подорожники — фото, описи та інформація про користувачів.",
    type: "website",
    url: "http://localhost:3000/travellers",
    },
  twitter: {
    card: "summary",
    title: "Мандрівники | Подорожники",
    description:
      "Перегляньте список мандрівників платформи Подорожники.",
    },
};


export default async function TravellersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["travelers"],
    queryFn: () => getAllTravelers(1, 8),
  });

  const dehydratedState = dehydrate(queryClient);

  return <TravellersClient dehydratedState={dehydratedState} />;
}
