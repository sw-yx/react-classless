This is a Typescript clone of Ryan Florence's [@reactions/component](https://github.com/reactions/component) library.

Example usage:

```jsx
import * as React from 'react';
import './App.css';

import { Component, SetState } from './components/index';

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
```

---

created with help from : https://medium.com/@stokedbits/adventures-in-creating-a-react-component-library-with-create-react-app-and-typescript-26d1116a7d87
