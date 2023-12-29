'use client'

import PostEdit from "@components/PostEdit";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@utils/theme";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";





function Page() {

  
  const router = useRouter();
  
  const params = useParams()
  
  const poemId = params.id;
  
  const [poem, setPoem] = useState(null)

  const {data : session, status} = useSession()

 
  

  
  useEffect(()=>{

    const getPoems = async() => {
      try{
        const result = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/poem/${poemId}`);
        console.log(result)
        setPoem(result.data)
      } catch(err) {
        console.log(err)
      }
    }

    if(poemId) {
      getPoems();
    }

    console.log(poemId)

    
  }, [poemId])

  if (status === "unauthenticated") {
    return router.replace('/');
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
          <PostEdit poemObj={poem}/>
      </Box>
    </ThemeProvider>
  );
}

export default Page;