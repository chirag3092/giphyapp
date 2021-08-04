export const giphyInjectible = (store: any): Promise<void> =>
  Promise.all([
    import(/* webpackChunkName: "giphy.saga" */ './giphy.saga'),
    import(/* webpackChunkName: "giphy.reducer" */ './giphy.reducer'),
  ]).then(([saga, reducer]) => {
    store.injectSaga('giphySaga', saga.default);
    store.injectReducer('giphySaga', reducer.default);
  });
