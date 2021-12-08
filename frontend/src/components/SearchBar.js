import React, { useState } from "react";
import "./SearchBar.css";
import SelectSearch from "react-select-search";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "react-bootstrap/Table";
import statesData from "../states.json";
import Fuse from "fuse.js";

function SearchBar() {
  const [location, setLocation] = useState("");
  var states = Object.assign(
    statesData.map((state) => ({ name: state, value: state }))
  );

  const options = {
    headers: {
      Authorization: "5ae2e3f221c38a28845f05b6e976bb53f7ead9f5b8d57fb053738023",
    },
  };

  async function fetchCoordinates(localUrl) {
    const response = await fetch(localUrl, options)
      .then((res) => res.json())
      .then((data) => data);
    const placeUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${response.lon}&lat=${response.lat}&limit=5&format=json&apikey=5ae2e3f221c38a28845f05b6e976bb53f7ead9f5b8d57fb053738023`;

    const response2 = await fetch(placeUrl, options)
      .then((res) => res.json())
      .then((data) => data);
    var places = [];
    Object.keys(response2).forEach((key) => {
      places.push(response2[key].name)
    });
    document.getElementById("td1").innerHTML = places[0];
    document.getElementById("td2").innerHTML = places[1];
    document.getElementById("td3").innerHTML = places[2];
    document.getElementById("td4").innerHTML = places[3];
    document.getElementById("td5").innerHTML = places[4];
  }

  function generateItin(loc) {
    const localUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${loc}&apikey=5ae2e3f221c38a28845f05b6e976bb53f7ead9f5b8d57fb053738023`;
    fetchCoordinates(localUrl);
  }

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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="td1"></td>
          </tr>
          <tr>
            <td id="td2"></td>
          </tr>
          <tr>
            <td id="td3"></td>
          </tr>
          <tr>
            <td id="td4"></td>
          </tr>
          <tr>
            <td id="td5"></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default SearchBar;
