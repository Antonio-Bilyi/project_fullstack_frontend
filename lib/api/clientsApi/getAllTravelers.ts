export type Traveler = {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
};

export type UserFrom = {
  _id: string;
  name: string;
  description?: string;
  avatarUrl: string;
};

export async function getAllTravelers(): Promise<Traveler[]> {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?page=1&perPage=100`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error(`Помилка запиту: ${res.status}`);
  const json = await res.json();
  const users: UserFrom[] = json.data?.data || []; 
  return users.map(u => ({
    id: u._id,
    name: u.name,
    description: u.description ?? "Мандрівник не залишив опис",
    avatarUrl: u.avatarUrl,
  }));
}