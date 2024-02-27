import Poem from "@models/poems";
import {connectDB} from '@utils/database'
import cloudinaryUpload from '@utils/cloudinaryUpload';
import { Readable } from 'stream';


export const GET = async(req, {params}) => {
    try{
        await connectDB();
        let poem = await Poem.findById(params.id);
        return new Response(JSON.stringify(poem), {status: 200, statusText: 'success'});
    } catch(err) {
        return new Response(err, {status: 400, statusText: 'error'});
    }
}

export const PATCH = async(req, {params}) => {
    try{
        await connectDB()
        const data = await req.formData();
        
        const queryObj = Object.fromEntries(new URLSearchParams(data));
        console.log('Reached route')

        // return new Response(queryObj, {status: 201, statusText: 'success'});

        let imageUrl;

        if(queryObj.image === 'null' || queryObj.image.indexOf('https') === -1) {
            console.log('Inner IF')
            imageUrl = await cloudinaryUpload.uploader.upload(queryObj.image, {folder: 'blackHoney'}).then(async function(result, err) {
                if(err) {
                    console.log(err, 'error on upload')
                    return new Response(err, {statusText: 'error'});
                }
                console.log('Inner Cloud')
                return result.url
            })
        } else{
            imageUrl = queryObj.image
        }

        console.log(imageUrl)

        let poem = await Poem.findByIdAndUpdate(params.id, {title: queryObj.title, body: queryObj.body, category: queryObj.category, tags: queryObj.tags.split(','), image: imageUrl});

        return new Response(JSON.stringify(poem), {status: 201, statusText: 'success'});
        
    } catch(err) {
        console.log(err)
        return new Response(err, {statusText: 'error'});
    }
}


export const DELETE = async(req, {params}) => {
    try{
        await connectDB();

        await Poem.findByIdAndDelete(params.id);

        return new Response(null, {status: 204, statusText: 'success'});
    } catch(err) {
        return new Response(err, {status: 400, statusText: 'error'});
    }
}