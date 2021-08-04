import React, { useContext, useState, useEffect } from 'react';
import { ReactReduxContext } from 'react-redux';

// eslint-disable-next-line import/no-anonymous-default-export
export default (duckInjectFns = []) => (WrappedComponent: any) => (props: any) => {
  const { store } = useContext(ReactReduxContext);
  const [isInjected, setIsInjected] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const derivedPromises = duckInjectFns.map(fn => fn(store));
    Promise.all(derivedPromises)
      .then(() => setIsInjected(true))
  }, [store]);

  return isInjected ? <WrappedComponent {...props} /> : null;
};
