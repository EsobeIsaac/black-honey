import Poem from "@models/poems";
import {connectDB} from '@utils/database'
import poemFilterClass from '@utils/poemFilterClass'
import cloudinaryUpload from '@utils/cloudinaryUpload';

export const POST = async(req, res) => {
    try{
        await connectDB()

        let queryObj = await req.json();


        let imageUrl;

        
        
        if(queryObj.image !== 'null' || queryObj.image.indexOf('https') === -1) {

            imageUrl = await cloudinaryUpload.uploader.upload(queryObj.image, {folder: 'blackHoney'}).then(async function(result, err) {
                if(err) {
                    console.log(err)
                    return new Response(err, {statusText: 'error'});
                }
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
        console.log(req.nextUrl.searchParams)
        let features = new poemFilterClass(Poem.find(), req.nextUrl.searchParams).paginate().filter().sort().fields();
        const poems = await features.query;
        return new Response(JSON.stringify(poems), {status: 200, statusText: 'success'});
    } catch(err) {
        return new Response(err, {status: 400, statusText: 'error'});
    }
}