import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/server/prismadb";
import { existsSync, mkdirSync } from "fs";
import sharp from "sharp";
import { v4 } from "uuid";
import { useCurrentUserAdmin } from '@/lib/server/helperServer';

export async function POST(request: NextRequest) {
  try {
    const user = await useCurrentUserAdmin(request)
    if (!user) return NextResponse.json("Unauthorized", {status: 401})

    const data = await request.formData()
    const file = data.get('file') as File

    console.log(file)
        
    if (!existsSync('./storage')){
      mkdirSync('./storage', { recursive: true });
    }

    const compress = {
      'png': {compressionLevel: 8, quality: 60},
      'jpeg': { quality: 60 },
      'webp': { quality: 60 },
      'gif': { }
    }

    // let fileData = sharp(fileMin)
    let fileData = sharp(await file.arrayBuffer(), { animated: true })
    
    let metadata = await fileData.metadata()
    
    let name = v4() + "." + metadata.format
    let fileUrl = `./storage/images/${name}`

    if (Object.keys(compress).findIndex(v => v == metadata.format) < 0) {
      throw "Không phải định dạng ảnh"
    }

    //@ts-ignore
    let fileSave = await fileData[metadata.format || "png"](compress[metadata.format || "png"]).toFile(fileUrl)
      .then((data: any) => {
        console.log(data)
        return data
      })

    let { format, size, width, height } = fileSave

    return NextResponse.json({ location: fileUrl.slice(1) })
  } catch (e) {
    console.log(e)
    return NextResponse.json("Error", {status: 400})
  }
} 