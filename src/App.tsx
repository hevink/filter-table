import { useState } from "react";
import "./App.css";
import { Input, Switch, Table } from "antd";
import { data } from "./data";

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

  const [searchName, setSearchName] = useState("");

  const handleFilterChange = (key: string, value: string, checked: boolean) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[key] = [...(updatedFilters[key] || []), value];
      } else {
        updatedFilters[key] = (updatedFilters[key] || []).filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };

  const applyFilters = () => {
    return data.filter((item) => {
      return (
        // Check if every selected filter matches the item
        Object.keys(selectedFilters).every((key) => {
          if (selectedFilters[key].length === 0) {
            return true; // If no filters selected for this key, include the item
          } else {
            return selectedFilters[key].includes(item[key]);
          }
        }) &&
        // Check if the name matches the search name (if provided)
        (searchName.trim() === "" ||
          (item.hasOwnProperty("name") &&
            (item as { name?: string }).name &&
            (item as unknown as { name: string }).name
              .toLowerCase()
              .includes(searchName.trim().toLowerCase())))
      );
    });
  };

  const renderSwitches = (key: string) => {
    const uniqueValues = Array.from(
      new Set(data.map((item) => item[key]))
    ).filter((value) => value !== undefined);
    return uniqueValues.map((value) => (
      <div key={value}>
        <Switch
          checked={selectedFilters[key]?.includes(value)}
          onChange={(checked) => handleFilterChange(key, value, checked)}
        />{" "}
        {value}
      </div>
    ));
  };

  // Check if data has the 'name' property
  const hasNameField = data.some((item) => item.hasOwnProperty("name"));

  const allKeys = data.reduce((keys, item) => {
    Object.keys(item).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, []);

  // Generate table columns dynamically
  const columns = allKeys.map((key) => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key: key,
    render: (text: string) => text || "-",
  }));

  // Generate table data based on applied filters
  const filteredData = applyFilters();
  const tableData = filteredData.map((item) => ({
    key: item.id.toString(),
    ...item,
  }));

  return (
    <>
      <div className="flex justify-center m-5">
        <div className=" border-gray-400  flex justify-center m-5">
          {Object.keys(initialSelectedFilters).map((key) => (
            <div key={key} className="border-r px-2">
              <h1 className="text-center font-bold capitalize mb-2 text-lg">
                {key}
              </h1>
              <div className="flex flex-col">{renderSwitches(key)}</div>
            </div>
          ))}
          {hasNameField && (
            <div className="border-r px-2">
              <h1 className="text-center font-bold capitalize mb-2 text-lg">
                name
              </h1>
              <div className="flex flex-col">
                <Input
                  placeholder="Search by name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
        />
      </div>
    </>
  );
}

export default App;
