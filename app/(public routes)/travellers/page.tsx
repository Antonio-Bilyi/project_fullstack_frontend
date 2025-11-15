import TravellersClient from "./Travellers.client";
import { getAllTravelers } from "@/lib/api/clientsApi/getAllTravelers";

export const metadata = {
  title: "Мандрівники",
  description: "Список мандрівників нашого сервісу",
};

export default async function TravellersPage() {
  const travelers = await getAllTravelers();
console.log("Travelers:", travelers);
  return (
    <main>
      <TravellersClient initialTravelers={travelers} />
    </main>
  );
}
