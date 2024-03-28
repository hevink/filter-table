import React, { useState } from "react";
import "./App.css";
import { Switch } from "antd";

// const data = [
//   {
//     id: 1,
//     mall: "V R mall",
//     address: "Surat",
//     rating: "A",
//   },
//   {
//     id: 2,
//     mall: "Rahul Raj Mall",
//     address: "dallas",
//     rating: "B",
//   },
//   {
//     id: 3,
//     mall: "Raj Imperial",
//     address: "san francisco",
//     rating: "B",
//     category: "one",
//   },
//   {
//     id: 4,
//     mall: "jane",
//     address: "denver",
//     category: "two",
//     rating: "C",
//   },
// ];

const data = [
  {
    id: 1,
    name: "foo",
    city: "dallas",
    category: "one",
    type: "A",
    active: "FALSE",
  },
  {
    id: 2,
    name: "bar",
    city: "dallas",
    category: "one",
    type: "B",
    active: "FALSE",
  },
  {
    id: 3,
    name: "jim",
    city: "san francisco",
    category: "one",
    type: "B",
    active: "TRUE",
  },
  {
    id: 4,
    name: "jane",
    city: "denver",
    category: "two",
    type: "C",
    active: "FALSE",
  },
];

function App() {
  const initialSelectedFilters: { [key: string]: string[] } = {};
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "id" && key !== "name") {
        initialSelectedFilters[key] = [];
      }
    });
  });

  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>(initialSelectedFilters);

  console.log(selectedFilters);

  const handleFilterChange = (key: string, value: string, checked: boolean) => {
    const updatedFilters = { ...selectedFilters };
    if (checked) {
      updatedFilters[key] = [...updatedFilters[key], value];
    } else {
      updatedFilters[key] = updatedFilters[key].filter(
        (item) => item !== value
      );
    }
    setSelectedFilters(updatedFilters);
  };

  const renderSwitches = (key: string) => {
    let uniqueValues = Array.from(new Set(data.map((item) => item[key])));
    // Filter out undefined or null values
    uniqueValues = uniqueValues.filter(
      (value) => value !== undefined && value !== null
    );

    return uniqueValues.map((value) => (
      <div key={value}>
        <Switch
          checked={selectedFilters[key].includes(value)}
          onChange={(checked) => handleFilterChange(key, value, checked)}
        />{" "}
        {value}
      </div>
    ));
  };

  return (
    <div className="flex justify-center m-5">
      {Object.keys(initialSelectedFilters).map((key) => (
        <div key={key} className="border-r border-gray-400 px-2">
          <h1 className="text-center font-bold capitalize mb-2 text-lg">
            {key}
          </h1>
          <div className="flex flex-col">{renderSwitches(key)}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
