import { useState } from "react";
import { Typography } from "@material-ui/core";

const GiphyGif = (props: any) => {
  const { images: { original: { width, height, url }, original_still: { url: pauseUrl } } } = props;

  const [play, setPlay] = useState(false);
  
  return <Typography 
            component="div" 
            onClick={() => setPlay(!play)}
            style={{ 
              width: `${width}px`, 
              height: `${height}px`,
              cursor: 'pointer',
            }}> <img src={ play ? url : pauseUrl } alt={'abcd'} /> </Typography>
 
};

export default GiphyGif;