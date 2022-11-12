import {Context, useContext} from 'react';

// eslint-disable-next-line
export default <T extends any>(context: Context<T | undefined>): T | never => {
  const value = useContext(context);
  if (value === undefined) {
    throw new TypeError(`No context provided for ${context.displayName}`);
  }
  return value;
};
