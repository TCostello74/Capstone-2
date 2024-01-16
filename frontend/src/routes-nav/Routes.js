// routes-nav/Routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Characters from '../characters/Characters';
import Quotes from '../quotes/Quotes';
import Trivia from '../trivia/Trivia';
import CharacterDetails from '../characters/CharacterDetails';

const Routes = () => {
  return (
    <Switch>
      <Route path="/characters/:id">
        <CharacterDetails />
      </Route>
      <Route path="/characters">
        <Characters />
      </Route>
      <Route path="/quotes">
        <Quotes />
      </Route>
      <Route path="/trivia">
        <Trivia />
      </Route>
      <Route path="/">
        <Homepage />
      </Route>
    </Switch>
  );
};

export default Routes;
