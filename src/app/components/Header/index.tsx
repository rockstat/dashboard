import * as React from 'react';

export interface HeaderProps {}

export interface HeaderState {}

export class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return (
      <header>
        <h1>ЙО</h1>
      </header>
    );
  }
}
