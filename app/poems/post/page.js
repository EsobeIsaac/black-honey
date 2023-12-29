'use client'


import PostEdit from "@components/PostEdit";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@utils/theme";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



function Post() {

  const router = useRouter();
  const {data : session, status} = useSession()

  if (status === "unauthenticated") {
    return router.replace('/');
  }


  return (
    <ThemeProvider theme={theme}>
      <Box>
          <PostEdit/>
      </Box>
    </ThemeProvider>
  );
}

export default Post;
