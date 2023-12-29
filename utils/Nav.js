'use client'

import Image from 'next/image';
import logo from '@public/logo/logo.png'
import { AppBar, Toolbar, IconButton, Stack, Typography, Avatar, Button, Drawer, Box, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Close, Menu } from '@mui/icons-material';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import theme from './theme';

function Nav() {
    const [screenWidth, setScreenWidth] = useState(globalThis?.window?.innerWidth);

    const [provider, setProvider] = useState(null)
    
    const [drawerMenu, setDrawerMenu] = useState(false);

    useEffect(()=>{
        const updateProvider = async() => {
            const response = await getProviders();
            setProvider(response)
        }
        updateProvider()
    }, [])
    
    useEffect(()=>{
        globalThis?.window?.addEventListener('resize', () => {
            setScreenWidth(globalThis?.window?.innerWidth)
        });

        return () => {
            globalThis?.window?.removeEventListener('resize', globalThis?.window);
        }
    }, [])

    const {data : session} = useSession()

    const closeNav = () => {
        setDrawerMenu(false);
    }
    

  return (
    <ThemeProvider theme={theme}>
        <AppBar sx={{backgroundColor: '#fff', zIndex:50000}} >
            <Toolbar>
                <IconButton>
                    <Image src={logo} width={150} height={'auto'} alt='logo'/>
                </IconButton> 
                <Typography flexGrow={1}></Typography>
                <Stack direction={'row'} spacing={1} alignContent={'center'}>
                    {
                        screenWidth > 600 && <>
                            <Link href={'/'}>
                                <Button>
                                    Home
                                </Button>
                            </Link>
                            <Link href={'/poems'}>
                                <Button>
                                    Poem
                                </Button>
                            </Link>

                            {
                                session?.user && <Link href={'/poems/post'}>
                                    <Button>
                                        Publish
                                    </Button>
                                </Link>
                            }
                            
                            
                            {
                                session?.user ? <Button variant='contained' onClick={()=>signOut()}  >
                                    Logout
                                </Button> : (provider && Object.values(provider).map((item)=>(<Button key={item.name}  variant='contained' onClick={()=>signIn(provider.id)} >
                                    Admin Login
                                </Button>)))
                                
                            }
                        </>
                    }
                    
                    {
                        session?.user && <Avatar src={session.user.image}/>
                    }
                        
                    {
                        (screenWidth <= 600) && <IconButton onClick={()=>setDrawerMenu((prevState)=>!prevState)}>
                        {drawerMenu ? <Close/> : <Menu/>}
                    </IconButton> 
                    }
                </Stack>
            </Toolbar>
        </AppBar>
        <Drawer open={drawerMenu} anchor='left' onClose={()=>setDrawerMenu(false)}>
            <Box p={2} pt={20} width={250}>
                <Stack spacing={2} alignContent={'center'}>
                    <Link onClick={()=>closeNav()} href={'/'}>
                        <Button>
                            Home
                        </Button>
                    </Link>
                    <Link onClick={()=>closeNav()} href={'/poems'}>
                        <Button>
                            Poem
                        </Button>
                    </Link>
                    {
                        session?.user && <Link onClick={()=>closeNav()} href={'/poems/post'}>
                            <Button>
                                Publish
                            </Button>
                        </Link>
                    }
                    
                    {
                        session?.user ? <Button variant='contained' onClick={()=>{
                            signOut()
                            closeNav()
                        }}  >
                            Logout
                        </Button> : (provider && Object.values(provider).map((item)=>(<Button key={item.name}  variant='contained' onClick={()=>signIn(provider.id)} >
                            Admin Login
                        </Button>)))
                        
                    }
                </Stack>
            </Box>
        </Drawer>
    </ThemeProvider>
  );
}

export default Nav;
