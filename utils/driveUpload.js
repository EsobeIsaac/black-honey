const fs = require('fs')
const {Readable} = require('stream');
const {google} = require('googleapis')
const path = require('path')
const GOOGLE_API_FOLDER = '1QOK-Q1cEcD5egML0bO86SI1bDCyUnpiW'
const apikeys = require('@utils/driveApiKey.json')
const scopes = ['https://www.googleapis.com/auth/drive']


const uploadFile = async (fileObject) => {
  // const bufferStream = new stream.PassThrough();
  try{
    const bytes = await fileObject.arrayBuffer();
    const bufferStream = Buffer.from(bytes);
    // bufferStream.end(fileObject.buffer);
    console.log(fileObject, bufferStream)
    const auth = new google.auth.GoogleAuth({
      keyFile: `utils/driveApiKey.json`,
        scopes: ['https://www.googleapis.com/auth/drive']
    })
    const { data } = await google.drive({ version: 'v3', auth }).files.create({
      media: {
        mimeType: fileObject.type,
        body: Readable.from(bufferStream),
      },
      requestBody: {
        name: Date.now() + '-' + Math.round(Math.random() * 1E9)+path.extname(fileObject.name),
        parents: [GOOGLE_API_FOLDER],
      },
      fields: 'id,name',
    });
    return `https://drive.google.com/uc?export=view&id=${data.id}`;
  } catch(err) {
    return process.env.NEXT_PUBLIC_DEFAULT_IMAGE
  }
  
};

module.exports = uploadFile;