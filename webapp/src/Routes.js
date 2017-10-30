import React from "react";
import { Route } from "react-router";

import locations from "./locations";

import Root from "./containers/Root";
import ParcelsMapContainer from "./containers/ParcelsMapContainer";

export default function Routes() {
  return (
    <Root>
      <Route exact path={locations.root} component={ParcelsMapContainer} />
    </Root>
  );
}