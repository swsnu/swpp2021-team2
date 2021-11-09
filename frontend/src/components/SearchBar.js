import React, { useState } from "react";
import "./SearchBar.css";
import SelectSearch from "react-select-search";
import statesData from "../states.json"
import Fuse from "fuse.js";

function SearchBar() {
  const [value, setValue] = useState("");
  var states = Object.assign(statesData.map((state) => ({name: state, value: state})))

  return (
    <SelectSearch
      options={states}
      value={value}
      onChange={setValue}
      search
      filterOptions={(options) => {
        const fuse = new Fuse(options, {
          keys: ["name", "value", "items.name"],
          threshold: 0.3
        });

        return (value) => {
          if (!value.length) {
            return options;
          }

          return fuse.search(value);
        };
      }}
      emptyMessage="Not found"
      placeholder="Enter a state..."
    />
  );
}

export default SearchBar;
