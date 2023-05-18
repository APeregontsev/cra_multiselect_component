import { useState } from "react";
import Select, { SelectOption } from "./components/Select";
import style from "./app.module.css";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

function App() {
  const [value1, setValue1] = useState<SelectOption | undefined>({
    label: "Press to choose",
    value: 0,
  });

  const [value2, setValue2] = useState<SelectOption[]>([
    options[0],
    options[1],
  ]);

  return (
    <div className={style.container}>
      <Select
        options={options}
        value={value1}
        onChange={(option) => setValue1(option)}
      />
      <br />
      <Select
        multiple
        options={options}
        value={value2}
        onChange={(option) => setValue2(option)}
      />
    </div>
  );
}

export default App;
