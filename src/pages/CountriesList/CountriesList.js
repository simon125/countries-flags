import { Container, Grid, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CountryListItem } from "./components/CountryListItem";

const mockCountires = [
  {
    flags: {
      png: "https://flagcdn.com/w320/ro.png",
      svg: "https://flagcdn.com/ro.svg",
    },
    name: {
      common: "Romania",
      official: "Romania",
      nativeName: {
        ron: {
          official: "România",
          common: "România",
        },
      },
    },
    capital: ["Bucharest"],
    altSpellings: ["RO", "Rumania", "Roumania", "România"],
    region: "Europe",
    population: 19286123,
  },
];

export const CountriesList = () => {
  const [countryName, setCountryName] = useState("");
  const [region, setRegion] = useState("all");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    /**
     * fetch() który robił zapytanie o kraje w konrketnym regionie
     */
    fetch(
      `https://restcountries.com/v3.1/region/${event.target.value}?fields=name,capital,region,population,flags`
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,region,population,flags`
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  };

  return (
    <Container fixed>
      <Grid container spacing={5} marginY="50px" justifyContent="space-between">
        <Grid item xs={4}>
          <form onSubmit={handleSubmit}>
            <TextField
              value={countryName}
              onChange={handleCountryNameChange}
              id="outlined-basic"
              label="Enter country name"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={5}>
          <Select fullWidth value={region} onChange={handleRegionChange}>
            <MenuItem disabled value="all">
              Select region
            </MenuItem>
            <MenuItem value="america">America</MenuItem>
            <MenuItem value="europe">Europe</MenuItem>
            <MenuItem value="asia">Asia</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={5} marginY="50px">
        {countries.map((country) => {
          return (
            <Grid item key={country.name.common} md={4} sm={6} xs={12}>
              <CountryListItem country={country} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
