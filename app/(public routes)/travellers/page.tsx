import TravellersClient from "./Travellers.client";
import { getAllTravelers } from "@/lib/api/serverApi/getAllTravelers";
import { emptyTravelersList } from "@/types/user";


export const metadata = {
  title: "Мандрівники",
  description: "Список мандрівників нашого сервісу",
};

export default async function TravellersPage() {
  const travelers = await getAllTravelers();
   const safeTravelers = travelers ?? emptyTravelersList; 
console.log("Travelers:", travelers);
  return (
    <main>
      <TravellersClient initialTravelers={safeTravelers} />
    </main>
  );
}
