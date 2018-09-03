import * as React from 'react';
import { inject as mobxInject } from 'mobx-react';

type objKey = string | number | symbol;

type Omit<A extends object, K extends objKey> = Pick<A, Exclude<keyof A, K>>;

type Argument<D extends object> = (stores: any) => D;

type Result<D extends object> = <A extends D>(
  component: React.ComponentType<A>
) => React.SFC<Omit<A, keyof D> & Partial<D>>;

export function inject<D extends object>(mapper: Argument<D>): Result<D> {
  return mobxInject.call(null, mapper);
}
