import * as React from 'react';
import './App.css';

import { Component, SetState } from './components/index';

/* tslint:disable:jsx-no-lambda */
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <Component
            initialState={{ test: 'hi' }}
            didMount={({ setState }) => setTimeout(() => setState({ test: 'typescript react' }), 3000)}
          >
            {({ state }) => <div> hello {state.test}</div>}
          </Component>
        </header>
      </div>
    );
  }
}

export default App;

{
  /* <p className="App-intro">
  To get started, edit <code>src/App.tsx</code> and save to reload.
</p> */
}
