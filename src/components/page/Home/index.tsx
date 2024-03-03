import { FC, useEffect, useState } from "react";
import { Prefecture, usePrefectures } from "@/hooks/usePrefectures";
import { Chart } from "@/components/shared/Chart";
import { redirect } from "react-router-dom";
import { PrefectureName } from "@/types/prefecture";
import prefectureColors from "@/constants/prefecture/prefectureColors";

type PoplulationType = "total" | "young" | "aged" | "working";

type YearValue = { year: number; value: number };

type Population = {
  label: PrefectureName;
  total: Array<YearValue>;
  young: Array<YearValue>;
  aged: Array<YearValue>;
  working: Array<YearValue>;
};

export const Home: FC = () => {
  const { prefectures, getPrefectures } = usePrefectures();
  const [population, setPopulation] = useState<Array<Population>>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    PrefectureName[]
  >([]);

  useEffect(() => {
    getPrefectures();
  }, [getPrefectures]);

  type ConvertedData = {
    year: number;
  } & {
    [K in PrefectureName]?: number;
  };

  const fetchPopulationData = async (prefCode: number) => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      return redirect("/register");
    }
    try {
      const res = await fetch(
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
          prefCode,
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

      return data.result.data;
    } catch {
      return redirect("/register");
    }
  };

  const prefWithColor = (prefectures: PrefectureName[]) => {
    return prefectures.map((pref) => {
      const color = prefectureColors[pref];
      return { name: pref, color };
    });
  };

  const convertData = (datas: Population[]): ConvertedData[] => {
    const yearMap = datas.reduce((acc, { label, total }) => {
      total.forEach(({ year, value }) => {
        if (!acc[year]) acc[year] = { year };
        acc[year][label] = value;
      });
      return acc;
    }, {} as { [key: number]: ConvertedData });

    return Object.values(yearMap).sort((a, b) => a.year - b.year);
  };

  const selectPrefecture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: code, checked } = e.target;
    const PrefectureName = prefectures?.find(
      (p) => p.prefCode === Number(code)
    )?.prefName;

    if (!PrefectureName) {
      console.error("Prefecture not found.");
      return;
    }

    const label = prefectures!.find(
      (p) => p.prefCode === Number(e.target.value)
    )!.prefName;

    if (checked) {
      setSelectedPrefectures([...selectedPrefectures, label]);

      const labeToPropertyMap: { [key: string]: PoplulationType } = {
        総人口: "total",
        年少人口: "young",
        高齢人口: "aged",
        生産年齢人口: "working",
      };

      if (population.some((p) => p.label === label)) return;

      const data = await fetchPopulationData(Number(code));

      const prefData = { label: label } as Population;

      data.forEach((d: { label: string; data: Array<YearValue> }) => {
        const prop = labeToPropertyMap[d.label];
        if (prop) {
          prefData[prop] = d.data;
        }
      });
      const newPopulation = [...population, prefData];
      setPopulation(newPopulation);
    } else {
      setSelectedPrefectures(selectedPrefectures.filter((p) => p !== label));
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        {prefectures?.map((pref: Prefecture) => (
          <span key={pref.prefCode}>
            <input
              type="checkbox"
              id={"pref_" + pref.prefCode}
              key={pref.prefCode}
              value={pref.prefCode}
              onChange={selectPrefecture}
            />
            <label htmlFor={"pref_" + pref.prefCode}>{pref.prefName}</label>
          </span>
        ))}
      </div>
      <Chart
        labels={prefWithColor(selectedPrefectures)}
        data={convertData(population)}
      />
    </div>
  );
};
