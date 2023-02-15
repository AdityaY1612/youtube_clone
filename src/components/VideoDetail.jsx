import React from 'react'
import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Typography,Box,Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {Video} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import YouTube from 'react-youtube';
import Videos from './Videos';
const VideoDetail = () => {
  const {id}=useParams();
  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null);
  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data)=>{console.log(data)
      setVideoDetail(data.items[0])});

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data)=>{console.log(data.items)
      setVideos(data.items)});
  },[id])
  if(!videoDetail?.snippet) return 'Loading ...';
  if(!videos) return 'Loading ...';
  const opts = {
    width: '100%',
    height: '70%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };


  const {snippet :{ title, channelId, channelTitle}, statistics :{ viewCount, likeCount}}=videoDetail;
  return (
    <Box minHeight="95vh">
    <Stack direction={{xs:'column',md:'row'}}>
      <Box flex={1}>
        <Box sx={{width:'100%',position:'sticky', top:'86px'}}>
          <YouTube   videoId={id} className='react-player' style={{width:'100%'}} opts={opts} />
          <Typography color="#fff" variant='h5' fontWeight='bold' p={2} mt={{sm:-26,md:-26}}>
            {videoDetail?.snippet?.title}
          </Typography>
          <Stack direction="row" justifyContent='space-between' color='#fff' py={1} px={2}>
            <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
              <Typography variant={{sm:'subtitle1',md:'h6'}} color='#fff'>
                {channelTitle}
                <CheckCircle sx= {{fontSize:'12px', color:'gray' , ml:'5px'}}/>
                </Typography>
                </Link>
                <Stack direction='row' gap='20px' alignItems='center'>
                  <Typography variant='body' sx={{opacity:0.7}}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography variant='body' sx={{opacity:0.7}}>
                    {parseInt(likeCount).toLocaleString()} Likes
                  </Typography>
                </Stack>
              
            
          </Stack>
        </Box>
      </Box>
      <Box px={2} py={{md:1, xs:5}} justifyContent='center' alignItems='center'>
        <Videos videos={videos} direction='column'/>

      </Box>  
      </Stack>
    </Box>
  )
}

export default VideoDetail