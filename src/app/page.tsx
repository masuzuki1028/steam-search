import Image from "next/image";

type Game = {
  appid: number;
  name: string;
  header_image: string;
};

const fetchGames = async (): Promise<Game[]> => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${apiBaseUrl}/api/games`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch games');
  }

  const data = await res.json();
  return data;
};

export default async function Home() {
  const games = await fetchGames();
  console.log('Games:', games);

  return (
    <div>
      <h1>ゲーム一覧(日本語対応)</h1>
      <ul>
        {games.map((game) => (
          <li key={game.appid}>
            <h2>{game.name}</h2>
            <Image src={game.header_image} width={400} height={300} alt={game.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
