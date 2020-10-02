import React from 'react';
//import bnApi from '../apis/bnApi';
import Calculator from './Calculator';
import Integral from './Integral';
import { Route, Switch, HashRouter, BrowserRouter } from 'react-router-dom';

//THIS HAS BEEN THE MOST MESSY AND SLOPPY REACT PROJECT I HAVE DONE. SORRY IF MY CODE LOOKS LIkE S*IT!

class App extends React.Component {
  state = { data: null };

  render() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Calculator}></Route>
            <Route exact path="/integral" component={Integral}></Route>
          </Switch>
        </BrowserRouter>
      );
    } else {
      return (
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Calculator}></Route>
            <Route exact path="/integral" component={Integral} />
          </Switch>
        </HashRouter>
      );
    }
  }
}

export default App;
