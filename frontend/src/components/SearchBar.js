import React, { useState } from "react";
import "./SearchBar.css";
import SelectSearch from "react-select-search";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import statesData from "../states.json";
import Fuse from "fuse.js";

function SearchBar() {
  const [location, setLocation] = useState("");
  var states = Object.assign(
    statesData.map((state) => ({ name: state, value: state }))
  );

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <SelectSearch
            options={states}
            value={location}
            onChange={setLocation}
            search
            filterOptions={(options) => {
              const fuse = new Fuse(options, {
                keys: ["name", "value", "items.name"],
                threshold: 0.3,
              });

              return (location) => {
                if (!location.length) {
                  return options;
                }

                return fuse.search(location);
              };
            }}
            emptyMessage="Not found"
            placeholder="Enter a state..."
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            className="generate-button"
            variant="contained"
            size="small"
            style={{marginLeft:"17px", marginTop:"17px"}}
            onClick={() => {
              console.log(location);
            }}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchBar;
