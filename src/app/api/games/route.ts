import { NextResponse } from "next/server";
import { fetchGames,fetchGameDetails } from "../../type/api";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  const gamesList = await fetchGames();
  console.log('Games list:', gamesList);

  try {
    // すでにデータベースに存在するすべてのappidを取得
    const existingGames = await prisma.games.findMany({
      select: { appid: true },
    });
  
    if (existingGames.length === 0) {
      // データベースに1件も存在しない場合、一括挿入
      await prisma.games.createMany({
        data: gamesList.map((game: { appid: number; name: string; }) => ({
          appid: game.appid,
          name: game.name,
        })),
        skipDuplicates: true,
      });
      console.log(`Inserted all ${gamesList.length} games.`);
    } else {
      // データベースに1件以上存在する場合、既存のappidをセットに格納
      const existingAppIds = new Set(existingGames.map(game => game.appid));
  
      // 新しいゲーム（データベースに存在しないもの）だけをフィルタリング
      const newGames = gamesList.filter((game: { appid: number; }) => !existingAppIds.has(game.appid));
  
      if (newGames.length > 0) {
        // 新しいゲームだけを一括挿入
        await prisma.games.createMany({
          data: newGames.map((game: { appid: number; name: string; }) => ({
            appid: game.appid,
            name: game.name,
          })),
        });
        console.log(`${newGames.length} new games inserted.`);
      } else {
        console.log('No new games to insert.');
      }
    }
  } catch (error) {
    console.error('Failed to insert games:', error);
  }


  // ゲーム詳細取得
  const filteredGames = [];


  const maxRequests = 100;
  for (let i = 0; i < Math.min(gamesList.length, maxRequests); i++) {
    const game = gamesList[i];
    const appId = game.appid;

    // ゲーム詳細を取得
    const details = await fetchGameDetails(appId);
    if (details && details.name) {
      // supported_languages に "日本語" が含まれているか確認
      if (details.supported_languages && details.supported_languages.includes("Japanese")) {
        filteredGames.push({
          appid: appId,
          name: details.name,
          header_image: details.header_image,
        });

        // // Insert into PostgreSQL via Prisma
        // try {
        //   await prisma.games.upsert({
        //     where: { appid: appId },
        //     update: {
        //       name: details.name,
        //     },
        //     create: {
        //       appid: appId,
        //       name: details.name,
        //     },
        //   });
        //   console.log(`Inserted game with appid ${appId} into the database.`);
        // } catch (error) {
        //   console.error(`Failed to insert game with appid ${appId}:`, error);
        // }
      } else {
        console.warn(`Skipping game with appid ${appId} due to unsupported language.`);
      }
    } else {
      console.warn(`Skipping game with appid ${appId} due to missing data.`);
    }

    // 1秒間待機してレートリミットを回避
    await delay(10);
  }

  console.log('Filtered games before returning:', filteredGames);

  return NextResponse.json(filteredGames);
}
