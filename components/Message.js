import React, { useEffect, useState } from "react"
import { Alert, Box } from "@mui/material"

const Message = function({message}) {

    const [time, setTime] = useState(null)

    let [messageWrap, setMessageWrap] = useState(message)

    console.log(messageWrap, message)
    
    // remove message
    

    useEffect(()=>{
        if(messageWrap.message) {
            setTime(setTimeout(() => {
                setMessageWrap({})
            }, 6000))
        }
    }, [messageWrap.message])
   

    return(
        
        <Box>
            
                { 
                    messageWrap.message ? (
                        <Alert severity={messageWrap.status === "success" ? "success" : "error"} onClose={()=>{
                            messageAlert()
                        }}>
                            <strong>{messageWrap.message}</strong>
                        </Alert>
                    ) : null
                }
        </Box>
    
    )
}

export default Message;