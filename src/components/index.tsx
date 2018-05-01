import * as React from 'react';

/* tslint:disable:interface-name variable-name jsdoc-format max-classes-per-file*/

export type SetState = ({}, a?: () => {}) => {} | void;
export interface PropsAndState {
  props: {};
  state: any;
}
export interface DidUpdateProps extends RProps {
  prevProps: any;
  prevState: {};
  snapshot?: {};
}
export interface ShouldUpdateProps extends PropsAndState {
  nextProps: {};
  nextState: {};
}
export interface RProps extends PropsAndState {
  forceUpdate: (a?: {}) => {} | void;
  setState: SetState;
}

export interface Props {
  /**
   * Message to append to component
   */
  initialState?: {};
  didMount?: (props?: RProps) => {};
  beforeUpdate?: (props?: DidUpdateProps) => {};
  didUpdate?: (props?: DidUpdateProps) => void;
  shouldUpdate?: (props?: ShouldUpdateProps) => boolean;
  willUnmount?: (props?: PropsAndState) => {};
  render?: (props?: RProps) => React.ReactNode | undefined;
  children?: (props?: RProps) => React.ReactNode;

  // passthrough
  // setState?: any;
  // forceUpdate?: any;
  // new lifecycles!
  derived?: {};
}

// experimental thing to wrap getDerivedStateFromProps... need to actually use it
export function DComponent(props: any) {
  class Instance extends React.Component {
    public static getDerivedStateFromProps(nextProps: {}, prevState: {}) {
      if (props.derivedState) {
        return props.derivedState(nextProps, prevState);
      }
      return null;
    }
    public state = props.initialState;
    public render() {
      // return <Component {...this.props} derived={this.state} />;
      const { children = () => 'hi' }: { children?: (props?: RProps) => React.ReactNode } = this.props;
      return (
        <Component
          initialState={props.initialState}
          didMount={props.didMount}
          beforeUpdate={props.beforeUpdate}
          didUpdate={props.didUpdate}
          shouldUpdate={props.shouldUpdate}
          willUnmount={props.willUnmount}
          render={children && children.bind(this)} // tslint:disable-line
          derived={this.state}
        />
      );
    }
    // public render() {
    //   const { children, ...rest }: { children: (props?: RProps) => React.ReactNode } & any = this.props;
    //   return (
    //     <Component {...rest} derived={this.state}>
    //       {args => children(args)}
    //     </Component>
    //   );
    // }
  }
  return <Instance {...props} />;
}

export class Component extends React.Component<Props> {
  public state: {} = this.props.initialState || {};

  public componentDidMount() {
    if (this.props.didMount) {
      this.props.didMount(this.getArgs());
    }
  }

  public shouldComponentUpdate(nextProps: {}, nextState: {}) {
    if (this.props.shouldUpdate) {
      return this.props.shouldUpdate({
        nextProps,
        nextState,
        props: this.props,
        state: this.state
      });
    } else {
      console.log('scu true'); // tslint:disable-line
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

  public componentDidUpdate(prevProps: {}, prevState: {}, snapshot: {}) {
    if (this.props.didUpdate) {
      this.props.didUpdate(
        Object.assign(this.getArgs(), {
          prevProps,
          prevState,
          snapshot
        })
      );
    }
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: {}) {
    if (this.props.beforeUpdate) {
      return this.props.beforeUpdate(
        Object.assign(this.getArgs(), {
          prevProps,
          prevState
        })
      );
    }
    return null;
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

  // private _setState =  (updater: {}, cb?: () => {}) => this.props.setState(updater, cb) || this.setState(updater, cb);
  // private _forceUpdate = (cb?: () => {}) => this.props.forceUpdate(cb) || this.forceUpdate(cb);
  private _setState = (updater: {}, cb?: () => {}) => this.setState(updater, cb);
  private _forceUpdate = (cb?: () => {}) => this.forceUpdate(cb);

  private getArgs(): RProps {
    const { state, props, _setState: setState, _forceUpdate: forceUpdate } = this;
    return {
      forceUpdate,
      props,
      setState,
      state: { ...state, ...props.derived }
    };
  }
}

// private _setState = (...args: {}[]) => this.setState(...args);
