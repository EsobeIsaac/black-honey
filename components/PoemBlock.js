import { Box, Container, Grid, ImageList, ImageListItem, ImageListItemBar, Stack, Typography } from "@mui/material";
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
                                <Link href={`/poems/${item._id}`}>
                                    <ImageListItem key={index}  className={classes.imageWrapper}>
                                        <Box width={'100%'} position={'relative'} minHeight={'270px'}>
                                            <Image src={item.image} sizes="(max-width: 480px) 100vw, (max-width: 600px) 50vw, (max-width: 1200px) 40vw, 33vw" alt="image" fill/>
                                        </Box>
                                        <ImageListItemBar title={item.title}/>
                                    </ImageListItem>
                                </Link>
                            </Grid>
                        }) : null
                    }
                </Grid>
            }
            
        </Container>
    </Box>
  );
}

export default RecentPoems;
