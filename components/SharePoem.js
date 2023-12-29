'use client'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Share from '@mui/icons-material/Share';
import { ThemeProvider } from '@mui/material';
import theme from '@utils/theme';
import { FacebookRounded, Instagram, LinkedIn, Twitter } from '@mui/icons-material';

function Poem({poem}) {

    const sharePrompt = () => {
        if(navigator.share) {
            navigator.share({
                url: window.location.href,
            })
        } 
    }

  return (
    <ThemeProvider theme={theme}>
        <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
            <Button endIcon={<Share/>} color='primary' onClick={()=>sharePrompt()}>Share</Button>
            <Stack direction={'row'}>
                <IconButton color='primary' href='https://facebook.com/esobe.isaac.56/' target='_blank'>
                    <FacebookRounded/>
                </IconButton>
                <IconButton color='primary' href='https://www.instagram.com/isaacesobe/' target='_blank'>
                    <Instagram/>
                </IconButton>
                <IconButton  color='primary' href='https://ng.linkedin.com/in/esobe-isaac-8864a4193' target='_blank'>
                    <LinkedIn/>
                </IconButton>
                <IconButton  color='primary' href='https://twitter.com/esobeisaac' target='_blank'>
                    <Twitter/>
                </IconButton>
            </Stack>
        </Stack>
    </ThemeProvider>
  );
}

export default Poem;
