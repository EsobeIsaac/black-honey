'use client'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import React from 'react';
import logo from '@public/logo/logo-white.png'
import Image from 'next/image';
import Link from 'next/link';
import { FacebookRounded, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Breadcrumbs, Button, Divider, IconButton, TextField, ThemeProvider, Typography } from '@mui/material';
import theme from './theme';


function Footer() {
  return (
    <ThemeProvider theme={theme}>
        <Box marginTop={-10}>
            <Container>
                <Box bgcolor={'primary.light'} p={4} sx={{borderRadius: '20px 20px 0px 0px', position: 'relative', top: '120px', textAlign: 'center'}}>
                    <Typography variant='h4' color={'secondary.main'} gutterBottom>Subscribe to our news letter</Typography>
                    <Typography variant='body1' color={'#fff'}>This is a demo of prompt to subscribe to news letter</Typography>
                    <Stack spacing={2} pt={4}>
                        <TextField  fullWidth sx={{backgroundColor: '#fff', borderRadius: '8px'}} size='small'/>
                        <Button variant='contained' fullWidth>Subscribe</Button>
                    </Stack>
                </Box>
            </Container>
                <Box bgcolor={'primary.main'} pt={25} pb={4}>
                    <Container>
                    <Box pb={1}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Image src={logo} width={200} height={'auto'} alt='logo'/>
                    <Stack direction={'row'}>
                        <Link passHref={true} href='https://facebook.com/esobe.isaac.56/' target='_blank'>
                            <IconButton color='secondary'>
                                <FacebookRounded/>
                            </IconButton>
                        </Link>
                        <Link passHref={true} href='https://www.instagram.com/isaacesobe/' target='_blank'>
                            <IconButton color='secondary' >
                                <Instagram/>
                            </IconButton>
                        </Link>
                        <Link passHref={true}  href='https://twitter.com/esobeisaac' target='_blank'>
                            <IconButton color='secondary'>
                                <Twitter/>
                            </IconButton>
                        </Link>
                    </Stack>
                        
                    </Stack>
                    </Box>
                    <Divider/>
                    <Box pt={1}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography color={'#fff'}>Designed By <Link passHref={true}  href='https://ng.linkedin.com/in/esobe-isaac-8864a4193' style={{color: '#c5832b'}} target='_blank'>Esobe</Link></Typography>
                    <Breadcrumbs separator='|' sx={{color: '#fff'}}>
                        <Link href={'/'}>
                            <Button sx={{color: '#fff'}} variant='text' size='small'>
                                Home
                            </Button>
                        </Link>
                        <Link href={'/poems'}>
                            <Button sx={{color: '#fff'}} variant='text' size='small'>
                                Poems
                            </Button>
                        </Link>
                    </Breadcrumbs>
                        
                    </Stack>
                    </Box>
                    </Container>
                </Box>
        </Box>
    </ThemeProvider>
  );
}

export default Footer;
