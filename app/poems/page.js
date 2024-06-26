'use client'
import Loading from "@components/Loading";
import Poems from "@components/Poems";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Search from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from  '@mui/material/styles'
// import { Box, Button, Container, Grid, IconButton, MenuItem, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "@utils/theme";
import axios from "axios";
import { useEffect, useState } from "react";
// import Box from "@mui/material/Box";



function PoemsPage() {

  const [poems, setPoems] = useState([]);
  const [reqSent, setReqSent] = useState([]);

  const [filter, setFilter] = useState({
    title: null,
    category: null,
    page: 1
  })

  const pageUpdate = (action) => {
    if(action === 'next') {
      return setFilter((prevState)=>({
        ...prevState,
        page: ++prevState.page
      }))
    }

    if(filter.page > 1) {
      return setFilter((prevState)=>({
        ...prevState,
        page: --prevState.page
      }))
    }

  }
  
  useEffect(()=>{
    const getPoems = async() => {
      setReqSent(true)
      try{
        console.log(filter.page)

        let queryString = `${process.env.NEXT_PUBLIC_URL}/api/poem?page=${filter.page}`

        Object.keys(filter).forEach(key => {
          if(filter[key] !== null && filter[key] !== filter['page']) {
            queryString = queryString+`&${key}=${filter[key]}`
          }
        })

        console.log(queryString)

        const result = await axios.get(queryString);

        setPoems(result.data)
      } catch(err) {
        console.log(err)
      } finally {
        setReqSent(false)
      }
    }
    getPoems();
  }, [filter])

  const deletePoem = async(poemId) => {
    setReqSent(true)
    try{
      
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/poem/${poemId}`);
      const result = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/poem?page=${filter.page}&${filter.title && 'title='+filter.title}&${filter.category && 'category='+filter.category}`);
      console.log(response)
      setPoems(result.data)
    } catch(err) {
      console.log(err)
    } finally {
      setReqSent(false)
    }
  }

  const categories = JSON.parse(process.env.NEXT_PUBLIC_CATEGORIES);

  return (
    <ThemeProvider theme={theme}>
      <Box mt={8}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label='Search by tag or keyword' value={filter.title || ''} onChange={(e)=>{
                setFilter((prevProps)=>({
                  ...prevProps,
                  page: 1,
                  title: e.target.value.toUpperCase()
                }))
              }} fullWidth InputProps={{
                endAdornment: <IconButton><Search/></IconButton>
              }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Search by category' onChange={(e)=>{
                setFilter((prevProps)=>({
                  ...prevProps,
                  page: 1,
                  category: e.target.value
                }))
              }} value={filter.category || ''} fullWidth select>
                <MenuItem value=''>All</MenuItem>
                {
                    categories.map((item, index)=><MenuItem key={index} value={item} sx={{textTransform: 'capitalize'}}>{item}</MenuItem>)
                }
              </TextField>
            </Grid>
          </Grid>
          <Box my={4}>
            <Typography variant="body1">Showing results for your search</Typography>
          </Box>
        </Container>
        
        {
          reqSent ? <Loading/> : <Poems poems={poems} deleteFunc={deletePoem}/>
        }

        <Box my={4}>
          <Container>
            <Stack direction={'row'} spacing={2}>
              <Button startIcon={<ArrowBack/>} onClick={()=>pageUpdate('prev')} disabled={filter.page <= 1}>Previous</Button>
              <Button endIcon={<ArrowForward/>} onClick={()=>pageUpdate('next')} disabled={poems.length < 10}>Next</Button>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default PoemsPage;
