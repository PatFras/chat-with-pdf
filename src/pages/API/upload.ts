import type { APIRoute } from "astro";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dqtmqzix9', 
  api_key: import.meta.env.api_key, 
  api_secret: import.meta.env.api_secret
});

const uploadStream = async (buffer: Uint8Array, options: {
    folder:string
}) => {
    return new Promise((resolve, reject) => {
        cloudinary
        .uploader
        .upload_stream(options, (error,result) => {
            if (result) return resolve(result);
            reject(error)
        }).end(buffer)
    })
}

export const POST: APIRoute = async ({request}) => {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (file == null) {
        return new Response("No file found", {status:400})
    }

    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    const result = await uploadStream(uint8Array, {
        folder:'pdf'
    })
    return new Response("Hello World!")
}