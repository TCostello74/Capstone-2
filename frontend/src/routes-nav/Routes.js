import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Characters from '../characters/Characters';
import Quotes from '../quotes/RandomQuote';
import TriviaHome from '../trivia/TriviaHome';
import Trivia from '../trivia/Trivia';
import TriviaScore from '../trivia/TriviaScore';
import CharacterDetails from '../characters/CharacterDetails';

const Routes = ({ setScore, score }) => {
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
      <Route path="/trivia" exact>
        <TriviaHome setScore={setScore} />
      </Route>
      <Route path="/trivia-quiz" exact>
        <Trivia setScore={setScore} />
      </Route>
      <Route path="/trivia-score" exact>
        <TriviaScore score={score}/>
      </Route>
      <Route path="/">
        <Homepage />
      </Route>
    </Switch>
  );
};

export default Routes;
