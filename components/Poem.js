import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SharePoem from './SharePoem';
import classes from '@styles/Poemi.module.css'
import CardMedia from '@mui/material/CardMedia';

function Poem({poem}) {


  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Container className={classes.poem}>
            <Box style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${poem.image})`}} className={classes.poemImgBox}>
                
            </Box>
            <Box my={4} textAlign={'center'}>
                <Typography variant='h4' component={'h1'} mb={2}>{poem.title}</Typography>
                <Typography variant='body1' component={'h1'} sx={{whiteSpace: 'pre-wrap'}}>{poem.body}</Typography>
                <Box my={2}>
                    <Typography variant='body1'>{poem.tags.map((tag, index)=><strong key={index}>{`#${tag} `}</strong>)}</Typography>
                </Box>
            </Box>
            
            <SharePoem/>
        </Container>
    </Box>
  );
}

export default Poem;
