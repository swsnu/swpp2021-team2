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

  const options = {
    headers: {
      Authorization:
        "5ae2e3f221c38a28845f05b6e976bb53f7ead9f5b8d57fb053738023",
    },
  };

  async function fetchCoordinates(localUrl) {
    const response = await fetch(localUrl, options)
      .then((res) => res.json())
      .then((data) => data);
    const placeUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${response.lon}&lat=${response.lat}&limit=5&format=json&apikey=5ae2e3f221c38a28845f05b6e976bb53f7ead9f5b8d57fb053738023`;

    const response2 = await fetch(placeUrl, options)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function generateItin(loc) {
    const localUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${loc}&apikey=5ae2e3f221c38a28845f05b6e976bb53f7ead9f5b8d57fb053738023`;
    fetchCoordinates(localUrl);
  }

  // const response3 = await fetch(placeUrl, options).then(function (data) {
  //   document.getElementById.innerHTML = `<p>5 objects with description in a 1km radius</p>`;
  //   loadList();
  // });

  // function loadList() {
  //   fetch(placeUrl, options).then(function (data) {
  //     let list = document.getElementById("list");
  //     list.innerHTML = "";
  //     data.forEach((item) => list.appendChild(createListItem(item)));
  //   });
  // }

  // function createListItem(item) {
  //   let a = document.createElement("a");
  //   a.className = "list-group-item list-group-item-action";
  //   a.setAttribute("data-id", item.xid);
  //   a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
  //                 <p class="list-group-item-text">${item.kinds}</p>`;
  //   return a;
  // }

  // firstLoad();
  // reportWebVitals();

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
            style={{ marginLeft: "17px", marginTop: "17px" }}
            onClick={() => {
              generateItin(location);
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
