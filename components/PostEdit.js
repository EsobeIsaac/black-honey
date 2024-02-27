import { useEffect, useState } from "react";

import axios from 'axios';

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Camera from "@mui/icons-material/Camera";
import ContactsOutlined from "@mui/icons-material/ContactsOutlined";
import Image from "next/image";
import classes from '@styles/Post.module.css'

import Message from "@components/Message";



const defaultImg =  process.env.NEXT_PUBLIC_DEFAULT_IMAGE;
function PostEdit({poemObj}) {
    
    const [image, setImage] = useState(poemObj?.image ? poemObj.image : null)
    const [poem, setPoem] = useState({
        title: null,
        body: null,
        category: null,
        tags: []
    })

    useEffect(()=>{
        if(poemObj) {
            setPoem({
                title: poemObj.title,
                body: poemObj.body,
                category: poemObj.category,
                tags: poemObj.tags
            })
            setImage(poemObj.image)
        }
    }, [poemObj])

    const categories = JSON.parse(process.env.NEXT_PUBLIC_CATEGORIES);

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

            
            const data = {...poem, image}
            console.log(data)

            const result = poemObj ? await axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/poem/${poemObj._id}`, JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json"
                }
            }) : await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/poem`, JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setMessage({message: poemObj ? 'update was successful' : 'Poem posted successfully', status: result.statusText});
            poemObj ? result.data : setPoem({
                title: null,
                body: null,
                category: null,
                tags: []
            });
        } catch(err) {
            console.log(err)
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



  return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh'}}>
            <Box width={'100%'} maxWidth={'600px'} my={4}>
                <Box mb={6}>
                    <Typography variant="h4" gutterBottom>Post a Poem</Typography>
                </Box>
                <Stack  width={'100%'} spacing={2}>
                    <Box className={classes.imageContainer} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image ? typeof image == 'object' ? image : image : defaultImg})`}}>
                        <IconButton sx={{ color: '#fff', border: '2px solid #fff', backgroundColor: 'primary'}} onClick={()=>{
                            document.getElementById('image').click()
                        }}>
                            <Camera style={{fontSize: '80px'}}/>
                        </IconButton>
                    </Box>

                    
                    
                    <input type='file' id='image' hidden onChange={(e) => {
                        // Get the selected file
                        const file = e.target.files[0];

                        // Initialize a new FileReader object
                        const reader = new FileReader();

                        // Define a function to execute when the file is loaded
                        reader.onload = function(event) {
                            // Get the base64 encoded string
                            const base64String = event.target.result;

                            // Send the base64 string to the backend
                            setImage(base64String);
                        };

                        // Read the file as a data URL (base64 encoded)
                        reader.readAsDataURL(file);
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
