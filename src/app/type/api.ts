// steam apiからのデータ取得
export const fetchGames = async () => {
  const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/', { cache: 'no-store' });
  const data = await response.json();
  const filteredGames = data.applist.apps.filter((game: { name: string }) => game.name);
  return filteredGames;
};

export const fetchGameDetails = async (appId: number) => {
  const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}&lang=jp_JP`);
  const data = await response.json();
  return data[appId]?.data;
};
