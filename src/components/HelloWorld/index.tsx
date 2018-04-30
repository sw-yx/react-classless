import * as React from 'react';
import './HelloWorld.css';

/* tslint:disable:interface-name */
export interface Props {
  /**
   * Message to append to component
   */
  message?: string;
}
/* tslint:disable:no-empty-interface */
export interface State {}

export default class HelloWorld extends React.Component<Props, State> {
  public static defaultProps: Props = {
    message: 'World'
  };

  public render() {
    return <div>Hello {this.props.message}</div>;
  }
}
