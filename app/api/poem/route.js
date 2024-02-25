import Poem from "@models/poems";
import {connectDB} from '@utils/database'
import poemFilterClass from '@utils/poemFilterClass'
import cloudinaryUpload from '@utils/cloudinaryUpload';

export const POST = async(req, res) => {
    try{
        await connectDB()
        const data = await req.formData();
        
        const queryObj = Object.fromEntries(new URLSearchParams(data));


        let imageUrl;

        
        
        if(queryObj.image !== 'null' || queryObj.image.indexOf('https') === -1) {
            console.log(queryObj)
            imageUrl = await cloudinaryUpload.uploader.upload(queryObj.image, {folder: 'blackHoney'}).then(async function(result) {
                return result.url
            })
        } else{
            imageUrl = process.env.NEXT_PUBLIC_DEFAULT_IMAGE
        }

        let poem = await Poem.create({title: queryObj.title, body: queryObj.body, category: queryObj.category, tags: queryObj.tags.split(','), image: imageUrl})

        return new Response(JSON.stringify(poem), {status: 201, statusText: 'success'});

    } catch(err) {
        console.log(err)
        return new Response(err, {status: 402, statusText: 'error'});
    }
}

export const GET = async(req) => {
    try{
        await connectDB();
        let features = new poemFilterClass(Poem.find(), req.nextUrl.searchParams).filter().sort().paginate().fields();
        const poems = await features.query;
        return new Response(JSON.stringify(poems), {status: 200, statusText: 'success'});
    } catch(err) {
        return new Response(err, {status: 400, statusText: 'error'});
    }
}