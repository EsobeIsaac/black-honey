"use client"

import About from "@components/About";
import HomeBanner from "@components/HomeBanner";
import PoemSlides from "@components/PoemSlides";
import PoemBlock from "@components/PoemBlock";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {ThemeProvider} from  '@mui/material/styles'
import theme from "@utils/theme";



function Page() {

  const [lr, setLr] = useState({
    poems: [],
    loading: false,
  })
  const [im, setIm] = useState({
    poems: [],
    loading: false,
  })
  const [sc, setSc] = useState({
    poems: [],
    loading: false,
  })

  let categories = ['love and relationship', 'inspiration and motivation', 'social commentary']

 useEffect(()=>{
    const getAllAndSet = async() => {
      setLr(prevState=>({
        ...prevState,
        loading: true
      }))

      setIm(prevState=>({
        ...prevState,
        loading: true
      }))

      setSc(prevState=>({
        ...prevState,
        loading: true
      }))

      try{

        categories.forEach(async(item)=>{
          const results = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/poem?limit=6&category=${item}`)
          console.log(results.data)
          if(item == categories[0]) {
            setLr(prevState=>({
              ...prevState,
              poems: results.data,
              loading: false
            }))
          }
  
          if(item == categories[1]) {
            setIm(prevState=>({
              ...prevState,
              poems: results.data,
              loading: false
            }))
          }
  
          if(item == categories[2]) {
            setSc(prevState=>({
              ...prevState,
              poems: results.data,
              loading: false
            }))
          }
  
        })

      } catch (err) {
        console.log(err.response)
      }
    }

    getAllAndSet()
 }, [])



  return (
    <ThemeProvider theme={theme}>
    <Box>
      <HomeBanner/>
      <About/>
      <PoemSlides data={lr} title={categories[0]}/>
      <PoemBlock data={sc} title={categories[2]}/>
      <PoemSlides  data={im} title={categories[1]}/>
    </Box>
    </ThemeProvider>
  );
}

export default Page;
