import React from 'react';
import { useState, useEffect } from 'react';
import { Box,  Typography, typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos} from './';
import { useParams } from 'react-router';
const SearchFeed = ({value}) => {

 const { searchTerm }=useParams();
  const [videos, setVideos] = useState([]);
  console.log(videos);
  console.log(searchTerm);
  useEffect(()=>{
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data)=>setVideos(data.items))
  },[searchTerm])
  return (
    <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}} >
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: 'white'}} >
         Search Results For:<span style={{color: '#FC1503'}}>  {searchTerm}</span> videos
       </Typography>

    <Videos videos={videos}/>
  </Box>
  )
}

export default SearchFeed