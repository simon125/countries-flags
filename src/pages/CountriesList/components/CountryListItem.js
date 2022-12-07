import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export const CountryListItem = (props) => {
  const { country } = props;
  const { flags, name, capital, region, population } = country;

  return (
    <div>
      <Card>
        <CardMedia component="img" image={flags.png} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name.common}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Region: {region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Population: {population}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Capital/s: {capital.map((cap) => cap).join(", ")}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
