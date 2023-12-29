import Poem from "@models/poems";
import {connectDB} from '@utils/database'
import poemFilterClass from '@utils/poemFilterClass'
import uploadFile from '@utils/driveUpload'
const { Readable } =  require('stream')

export const POST = async(req) => {
    try{
        await connectDB()
        const data = await req.formData();
        
        const queryObj = Object.fromEntries(new URLSearchParams(data));

        const image = data.get('image');
        // const bytes = await image.arrayBuffer();
        // const buffer = Buffer.from(bytes);
        
        let fileUrl = await uploadFile(image);


        const poem = await Poem.create({title: queryObj.title, body: queryObj.body, category: queryObj.category, tags: queryObj.tags.split(','), image: fileUrl ? `https://drive.google.com/uc?export=view&id=${fileUrl}` : process.env.NEXT_PUBLIC_DEFAULT_IMAGE});

        return new Response(poem, {status: 201, statusText: 'success'});
    } catch(err) {
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