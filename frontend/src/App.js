import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots/SpotList/SpotList";
import SpotById from "./components/Spots/SpotsById/SpotById";
import SpotsForms from "./components/Spots/SpotsForm/SpotsForm";
import { getAllSpots } from "./store/spotsReducer";
import EditSpotsForm from "./components/Spots/EditSpotsForm/EditSpotsForm";
import { CreateReviews } from "./components/Reviews/CreateReviews/CreateReviews";
import { getSpotReviews } from "./store/reviewsReducer";
import UserSpots from "./components/Spots/UserSpots/UserSpots";
import UserSpotDetails from "./components/Spots/UserSpotDetails/UserSpotDetails";
function App() {
  const dispatch = useDispatch();
  const {spotId} = useParams()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllSpots())
    dispatch(getSpotReviews(spotId))
  }, [dispatch,spotId]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotList />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

         <Route exact path="/spots">
            <SpotsForms />
          </Route> 

          <Route exact path="/spots/myspots">
          <UserSpots/>
        </Route>


          <Route exact path="/spots/:spotId">
            <SpotById />
          </Route>

          <Route exact path="/spots/:spotId/update">
          <EditSpotsForm/>
        </Route>

      

        </Switch>
      )}
    </div>
  );
}

export default App;
