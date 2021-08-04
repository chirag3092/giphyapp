import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';

import withDucks from '../../Hoc/withDucks';
import { Grid, TextField, Typography, CircularProgress } from '@material-ui/core';

import { giphyInjectible } from '../../sagas/giphy';
import { GIPHY_FETCH_DATA_EFFECT, GIPHY_SEARCH_DATA_EFFECT } from "../../sagas/giphy/giphy.types";

import debounce from "../../helpers/debounce";
import GiphyGif from './GiphyGif';
import { useStyle } from './useStyle';
import { GetGiphyData, SearchGiphyData } from '../../sagas/giphy/giphy.saga';

const Giphy = ({ giphySaga, fetchGiphyData, searchGiphyData }: any) => {
  const { giphyList, paginator, loadingType } = giphySaga; 
  const [searchTerm, setSearchTerm ] = useState('');
  useEffect(() => {
    fetchGiphyData({ offset: 0 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if(searchTerm) {
      searchGiphyData({ searchTerm, offset: 0 });
    }
    else {
      fetchGiphyData({ offset: 0 });
    }
  }

  const handleScroll = useCallback(
    (e, paginatorObj) => {
      if (loadingType === 'scroll') {
        e.preventDefault();
        return;
      }
      
      const targetNode = e.target.documentElement;
      const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
      if (scrollTop > 0 && scrollTop + targetNode.clientHeight + 200 >= targetNode.scrollHeight) {
        if(searchTerm) {
          searchGiphyData({ searchTerm, offset: paginatorObj.offset + 1 });
        }
        else {
          fetchGiphyData({ offset: paginatorObj.offset + 1 });
        }
        
      }
    },
    [fetchGiphyData, loadingType, searchGiphyData, searchTerm],
  );

  useEffect(() => {
    // later worry about listener
    const handler = (e: Event): void => handleScroll(e, paginator);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [paginator, handleScroll]);

  const classes = useStyle();
  
  return (
    <>
    { loadingType === 'full' && !searchTerm ? 
        <Typography component="div" className={classes.loader}>
          <CircularProgress />
        </Typography>
      : 
      <>
        <Typography component="div" style={{ textAlign: 'center', paddingTop: '2rem' }} >
          <TextField 
            id="standard-search" 
            label="Search gif" 
            type="search" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => debounce(() => handleOnChange(e), 300)}
            autoComplete="off"
          />
        </Typography>
        <Grid container spacing={2} style={{ margin: '1rem', width: `90%` }}>
          { Object.values(giphyList).length > 0 && Object.values(giphyList).map((item: any, index: number) =>{
            
              return (
                <Grid item key={item['id']}>
                  <GiphyGif images={item['images']} />
                </Grid>
              )
          }) }
        </Grid>
        { loadingType === 'scroll' && 
        <Typography component="div" className={classes.scrollLoader}>
          <CircularProgress />
        </Typography> }
      </>
    }
    </>
  )
};

const mapStateToProps = (state: any) => {
  const { giphySaga = {} } = state;
  return {
    giphySaga,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchGiphyData: (args: GetGiphyData['payload']) => dispatch({ type: GIPHY_FETCH_DATA_EFFECT, payload: args }),
  searchGiphyData: (args: SearchGiphyData['payload']) => dispatch({ type: GIPHY_SEARCH_DATA_EFFECT, payload: args }),
});

const injectibleSagasList = [giphyInjectible] as any;
export default withDucks(injectibleSagasList)(connect(mapStateToProps, mapDispatchToProps)(Giphy));

