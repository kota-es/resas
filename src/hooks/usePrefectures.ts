import { PrefectureName } from "@/types/prefecture";
import { useCallback, useState } from "react";
import { redirect } from "react-router-dom";

export type Prefecture = {
  prefCode: number;
  prefName: PrefectureName;
};

export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[] | null>(null);

  const getPrefectures = useCallback(async () => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      return redirect("/register");
    }

    try {
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
      console.log(JSON.stringify(data));
      setPrefectures(data.result);
    } catch {
      return redirect("/register");
    }
  }, []);

  return { prefectures, getPrefectures };
};
