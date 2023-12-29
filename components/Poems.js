'use client'

import Image from "next/image";
import classes from '@styles/Poem.module.css'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { ArrowRight, Edit } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


function Poems({poems, deleteFunc}) {
    const router = useRouter()
    const {data : session} = useSession()


  return (
    <Box>
        <Container>
            <Grid container spacing={2}>
                {
                    !poems[0] ? <Typography variant='h4'>No Result Found</Typography> : poems.map((item, index)=>{
                        return <Grid key={index} item xs={6} sm={4} md={3}>
                            <Card>
                                <CardMedia component='img' sx={{height: 250}} alt='image' image={item.image}/>
                                <CardContent>
                                    <Typography variant='subtitle1'>{item.title}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack spacing={1} width={'100%'}>
                                        <Stack direction={'row'} spacing={1}>
                                            <Button variant='contained' color={'primary'} size='small' fullWidth onClick={()=>router.push(`/poems/${item._id}`)} >Read</Button>
                                            {
                                                session?.user && <IconButton color={'primary'} onClick={()=>router.replace(`/poems/edit/${item._id}`)}><Edit/></IconButton>
                                            }
                                        </Stack>
                                        {
                                            session?.user && <Button variant='contained' color={'error'} size='small' fullWidth onClick={()=>{deleteFunc(item._id)}} >Delete</Button>
                                        }
                                        
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    </Box>
  );
}

export default Poems;
