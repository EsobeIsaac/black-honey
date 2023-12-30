import Poem from "@models/poems";
import {connectDB} from '@utils/database'
import uploadFile from "@utils/driveUpload";


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
        await connectDB();
        const data = await req.formData();
        const image = data.get('image');

        const queryObj = Object.fromEntries(new URLSearchParams(data));

        
        let fileUrl;
        if(queryObj?.image?.includes('https://drive.google.com')) {
            fileUrl = queryObj.image
        }
        
        if(!queryObj?.image?.includes('https://drive.google.com')) {
            fileUrl = await uploadFile(image);
        }


        let poem = await Poem.findByIdAndUpdate(params.id, {title: queryObj.title, body: queryObj.body, category: queryObj.category, tags: queryObj.tags.split(','), image: fileUrl});
        
        return new Response(JSON.stringify(poem), {status: 200, statusText: 'success', message: 'poem updated successfully'});
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