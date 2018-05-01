import * as React from 'react';
import './App.css';

import { Component, DComponent, SetState } from './components/index';

/* tslint:disable:jsx-no-lambda */
class App extends React.Component {
  public state = {
    text: 'beforeclick'
  };
  public handleClick = () => this.setState({ text: 'afterclick' });
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <button onClick={this.handleClick}>click me</button> */}
          <TestComponent testprop={this.state.text} />
        </header>
      </div>
    );
  }
}
// function TestComponent(props: { testprop: string }) {
//   return (
//     <Component
//       initialState={{ test: 'hi' }}
//       didMount={({ setState }) => setTimeout(() => setState({ test: 'typescript react' }), 1000)}
//       didUpdate={({ snapshot }) => console.warn({ snapshot })} // tslint:disable-line
//       beforeUpdate={() => `hai i'm a ${props.testprop}`}
//     >
//       {({ state }) => (
//         <div>
//           <div>hello {state.test}</div>
//         </div>
//       )}
//     </Component>
//   );
// }

function TestComponent(props: any) {
  function didMount({ setState }) {
    /* tslint:disable */
    setTimeout(function() {
      setState({ test: 'typescript react' });
    }, 3000);
  }
  function render({ state, setState }) {
    return (
      <div>
        <button onClick={() => setState({ test: 'bye' })}>click me</button>
        <div>hello {state.test}</div>
        <div>derived: {state.deriv}</div>
      </div>
    );
  }
  return (
    <DComponent
      initialState={{ test: 'hi' }}
      // didMount={({ setState }) => setTimeout(() => setState({ test: 'typescript react' }), 3000)}
      didMount={didMount}
      derivedState={(_, prevState) => ({ deriv: prevState.test + '123' })}
      didUpdate={({ snapshot }) => console.warn({ snapshot })} // tslint:disable-line
      beforeUpdate={({ prevState }) => `hai i'm a ${prevState.test}`}
    >
      {render}
    </DComponent>
  );
}

export default App;

{
  /* <p className="App-intro">
  To get started, edit <code>src/App.tsx</code> and save to reload.
</p> */
}
