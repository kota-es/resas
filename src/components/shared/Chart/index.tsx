import { FC } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

type Label = {
  name: string;
  color: string;
};

type Data = {
  year: number;
  [key: string]: number;
};

type Props = {
  data: Data[];
  labels: Label[];
};

export const Chart: FC<Props> = (props) => {
  const data = props.data;
  const labels: Label[] = props.labels;
  return (
    <LineChart width={600} height={400} data={data}>
      <XAxis dataKey="year" />
      <YAxis />
      {labels.map((label) => (
        <Line
          type="monotone"
          dataKey={label.name}
          stroke={label.color}
          dot={true}
          key={label.name}
        />
      ))}
      <Tooltip />
    </LineChart>
  );
};
