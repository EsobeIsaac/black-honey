import { Avatar, Box, Container, Divider, Stack, Typography } from "@mui/material";
import classes from '@styles/HeadBanner.module.css'
import Books from '@public/images/handwriting.jpg'
import icon from '@public/logo/icon.png'


function HomeBanner() {
    
      return (
        <Box className={classes.parentBox}>
                <Box className={classes.box} sx={{backgroundImage: `linear-gradient(rgba(13, 19, 33, 0.4), rgba(13, 19, 33, 0.4)), url(${Books.src})`}}>
                    <Container>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} color={'#fff'}>
                        <Divider width={'30%'}/>
                        <Avatar sx={{height: '120px', width: '120px'}} src={icon.src}/>
                        <Divider width={'30%'}/>
                    </Stack>
                        {/* <Typography variant="h6" color={'primary'}>Head Tag</Typography>
                        <Typography variant="h2">Pen Name</Typography>
                        <Typography variant="body1">Pen phrase or motto, something ethical</Typography> */}
                    </Container>
                </Box>
        </Box>
      );
}

export default HomeBanner;
