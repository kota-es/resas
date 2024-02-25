import { FC } from "react";
import { redirect, useLoaderData } from "react-router-dom";

type Prefecture = {
  prefCode: number;
  prefName: string;
};

type Prefectures = Prefecture[];

export const loader = async () => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    return redirect("/register");
  }
  const res = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );

  const data = await res.json();
  if (data.statusCode === "403") {
    return redirect("/register");
  }

  return data.result;
};

export const Home: FC = () => {
  const data = useLoaderData() as Prefectures;

  return (
    <div>
      <h1>Home</h1>
      {data.map((pref: any) => (
        <div key={pref.prefCode}>{pref.prefName}</div>
      ))}
    </div>
  );
};
