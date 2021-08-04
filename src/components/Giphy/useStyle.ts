import { createStyles, makeStyles } from '@material-ui/core';

export const useStyle = makeStyles(() =>
  createStyles({
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',      
    },
    scrollLoader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100px',
    },
  }),
);