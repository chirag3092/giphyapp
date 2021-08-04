import React, { useState } from 'react';

import { Paper, Switch, AppBar, Toolbar } from '@material-ui/core';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Giphy from './components/Giphy';
import { grey, deepPurple } from '@material-ui/core/colors';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  
 
  const handleThemeChange = () => {
    console.log(isDarkTheme);
    setIsDarkTheme(!isDarkTheme);
  };

  const lightTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: deepPurple[500],
      },
    },
  });
  
  const darkTheme = createTheme({
    palette: {
       type: 'dark',
       primary: {
         main: grey['900'],
       },
    },
  });
 
  const themeMode = isDarkTheme ? darkTheme : lightTheme;
  return (
      <ThemeProvider theme={themeMode}>
        <AppBar position="static">
          <Toolbar>
            <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          </Toolbar>
        </AppBar>
        <Paper style={{ height: '100%' }}>
          <Giphy />
        </Paper>
      </ThemeProvider>
  );
}

export default App;
