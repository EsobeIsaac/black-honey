import { useEffect, useState } from "react";

import axios from 'axios';

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Alert, ButtonGroup, IconButton, MenuItem } from "@mui/material";
import { Camera, FormatBold, FormatItalic, FormatUnderlined } from "@mui/icons-material";
import Image from "next/image";
import classes from '@styles/Post.module.css'

import Message from "@components/Message";



const defaultImg =  process.env.NEXT_PUBLIC_DEFAULT_IMAGE;
function PostEdit({poemObj}) {
    
    const [image, setImage] = useState(poemObj?.image ? poemObj.image : null)
    const [poem, setPoem] = useState({
        title: poemObj ? poemObj.image : null,
        body: poemObj ? poemObj.image : null,
        category: poemObj ? poemObj.image : null,
        tags: poemObj ? poemObj.image : []
    })


    const categories = JSON.parse(process.env.NEXT_PUBLIC_CATEGORIES);

    console.log(categories)

    const [message, setMessage] = useState({message: null, status: null})

    const [reqSent, setReqSent] = useState(false)

    const handleChange = (key, inputValue) => {

        let value = inputValue;

        if(key === 'tags') {
           value = value.split(',')
        }

        let update = {};      

        Object.keys(poem).forEach((item)=>{
            if(item === key) {
                update[item] = value
            }
        })

        setPoem((prevState)=>({
            ...prevState,
            ...update
        }))
    }


    const handleSubmit = async() => {
        setReqSent(true)
        try{
            const data = new FormData();
            if(image) {
                data.set('image', image);
            }
            // data.append(poem);
            Object.entries(poem).forEach((item)=>{
                data.append(item[0], item[1])
            })

            const result = poemObj ? await axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/poem/${poemObj._id}`, data) : await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/poem`, data);

            setMessage({message: poemObj ? 'update was successful' : 'Poem posted successfully', status: result.statusText});
            poemObj ? result.data : setPoem({
                title: null,
                body: null,
                category: null,
                tags: []
            });
        } catch(err) {
            if(err.response) {
                setMessage({message: err.response.data, status: err.response.statusText})
            }
        } finally{
            setReqSent(false)
        }
    }

    useEffect(()=>{
        if(message && message.message) {
            setTimeout(() => {
                setMessage({message: null, status: null})
            }, 6000)
        }
        return ()=>{
            // clearTimeout()
        }
    }, [message])

    console.log(typeof image)


  return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh'}}>
            <Box width={'100%'} maxWidth={'600px'} my={4}>
                <Box mb={6}>
                    <Typography variant="h4" gutterBottom>Post a Poem</Typography>
                </Box>
                <Stack  width={'100%'} spacing={2}>
                    <Box className={classes.imageContainer} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image ? typeof image === Object ? URL.createObjectURL(image) : image : defaultImg})`}}>
                        <IconButton sx={{ color: '#fff', border: '2px solid #fff', backgroundColor: 'primary'}} onClick={()=>{
                            document.getElementById('image').click()
                        }}>
                            <Camera style={{fontSize: '80px'}}/>
                        </IconButton>
                    </Box>

                    
                    
                    <input type='file' id='image' hidden onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}/>

                    <Stack direction='row' spacing={2}>
                        <TextField multiline fullWidth label="Title" value={poem.title || ''} onChange={(e)=>handleChange('title', e.target.value.toUpperCase())}/>
                        <TextField label='Select Category' fullWidth select value={poem.category || ''} onChange={(e)=>handleChange('category', e.target.value)}>
                            {
                                categories.map((item, index)=><MenuItem key={index} value={item} sx={{textTransform: 'capitalize'}}>{item}</MenuItem>)
                            }
                        </TextField>
                    </Stack>
                    
                    <TextField rows={10} multiline fullWidth label="Content" value={poem.body || ''} onChange={(e)=>handleChange('body', e.target.value)} />
                    <TextField multiline fullWidth label="Add #Tags Separate tags with comma (,)" value={poem.tags.join(',')} onChange={(e)=>handleChange('tags', e.target.value)}/>
                    
                    <Box>
                        { 
                            message && message.message ? (
                                <Alert severity={message.status === "success" ? "success" : "error"} onClose={()=>{
                                    setMessage()
                                }}>
                                    <strong>{message.message}</strong>
                                </Alert>
                            ) : null
                        }
                    </Box>

                    <Button variant="contained" onClick={handleSubmit} disabled={reqSent}>Post</Button>

                </Stack>
            </Box>
        </Box>
  );
}

export default PostEdit;
