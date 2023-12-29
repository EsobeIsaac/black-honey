import { Box, Container, Grid, Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";
import Image from "next/image";
import classes from '@styles/RecentPoems.module.css'
import Link from "next/link";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

function RecentPoems({data, title}) {


      

  return (
    <Box py={10} bgcolor={'primary.main'}>
        <Container>
            <Typography variant='h4' mb={6} color={'#fff'}>{title}</Typography>
            {
                data.loading ? <Loading/> : <Grid container spacing={1}>
                    {
                        data.poems && data.poems[0] ? data.poems.map((item, index)=>{
                            return <Grid item key={index} xs={6} sm={6} md={4} lg={4} xl={3}>
                                <Card sx={{margin: '0px 5px'}}>
                                    <CardMedia component='img' sx={{height: 250}} alt='image' image={item.image}/>
                                    <CardContent>
                                        <Typography variant='subtitle1'>{item.title}</Typography>
                                    </CardContent>
                                    <CardActions >
                                    <Link href={`/poems/${item._id}`} style={{width: '100%'}}>
                                        <Button variant='contained' color={'primary'} size='small' fullWidth>Read</Button>
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
