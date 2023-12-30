import { Box, Container, Grid, Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import Image from "next/image";
import classes from '@styles/RecentPoems.module.css'
import Link from "next/link";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { ReadMoreRounded } from "@mui/icons-material";

function RecentPoems({data, title}) {


      

  return (
    <Box py={10} bgcolor={'primary.main'}>
        <Container>
            <Typography variant='h4' mb={6} color={'#fff'}>{title}</Typography>
            {
                data.loading ? <Loading/> : <Grid container spacing={1}>
                    {
                        data.poems && data.poems[0] ? data.poems.map((item, index)=>{
                            return <Grid item key={index} xs={12} sm={6} md={4} lg={4} xl={3}>
                                <Card sx={{margin: '0px 5px', bgcolor: 'primary'}} className={classes.box}>
                                    <CardMedia component='img' className={classes.media} sx={{height: 250}} alt='image' image={item.image}/>
                                    <CardContent bgcolor='#0d1321'>
                                        <Typography color='primary' textAlign={'center'} variant='subtitle1'>{item.title}</Typography>
                                    </CardContent>
                                    <CardActions className={classes.action}>
                                    <Link href={`/poems/${item._id}`}> 
                                        <IconButton sx={{backgroundColor: 'primary.main', color: '#fff'}} size="large"><ReadMoreRounded/></IconButton>
                                    </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        }) : <Typography variant="h6">No Item in this category</Typography>
                    }
                </Grid>
            }
            
        </Container>
    </Box>
  );
}

export default RecentPoems;
