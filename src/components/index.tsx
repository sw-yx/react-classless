import * as React from 'react';

/* tslint:disable:interface-name variable-name jsdoc-format */

export type SetState = ({}, a?: () => {}) => {} | void;
export interface PropsAndState {
  props: object;
  state: any;
}
export interface DidUpdateProps extends RProps {
  prevProps: object;
  prevState: object;
}
export interface ShouldUpdateProps extends PropsAndState {
  nextProps: object;
  nextState: object;
}
export interface RProps extends PropsAndState {
  forceUpdate: (a?: {}) => {} | void;
  setState: SetState;
}

export interface Props {
  /**
   * Message to append to component
   */
  initialState?: object;
  didMount?: (props?: RProps) => {};
  didUpdate?: (props?: DidUpdateProps) => {};
  shouldUpdate?: (props?: ShouldUpdateProps) => boolean;
  willUnmount?: (props?: PropsAndState) => {};
  render?: (props?: RProps) => React.ReactNode;
  children?: (props?: RProps) => React.ReactNode;
}

export class Component extends React.Component<Props> {
  public state: object = this.props.initialState || {};

  public componentDidMount() {
    if (this.props.didMount) {
      this.props.didMount(this.getArgs());
    }
  }

  public shouldComponentUpdate(nextProps: object, nextState: object) {
    if (this.props.shouldUpdate) {
      return this.props.shouldUpdate({
        nextProps,
        nextState,
        props: this.props,
        state: this.state
      });
    } else {
      return true;
    }
  }

  public componentWillUnmount() {
    if (this.props.willUnmount) {
      this.props.willUnmount({
        props: this.props,
        state: this.state
      });
    }
  }

  public componentDidUpdate(prevProps: object, prevState: object) {
    if (this.props.didUpdate) {
      this.props.didUpdate(
        Object.assign(this.getArgs(), {
          prevProps,
          prevState
        })
      );
    }
  }

  public render() {
    const { children, render } = this.props;
    return children
      ? typeof children === 'function'
        ? children(this.getArgs())
        : children
      : render
        ? render(this.getArgs())
        : null;
  }

  private _setState = (updater: {}, cb?: () => {}) => this.setState(updater, cb);
  private _forceUpdate = (cb?: () => {}) => this.forceUpdate(cb);

  private getArgs(): RProps {
    const { state, props, _setState: setState, _forceUpdate: forceUpdate } = this;
    return {
      forceUpdate,
      props,
      setState,
      state
    };
  }
}

// private _setState = (...args: object[]) => this.setState(...args);
