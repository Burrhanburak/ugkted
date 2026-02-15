import { NextResponse } from "next/server";
import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
        return new NextResponse("Missing filename or contentType", { status: 400 });
    }

    const uniqueFilename = `${Date.now()}-${filename}`;

    const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: uniqueFilename,
            ContentType: contentType,
        }),
        { expiresIn: 3600 }
    );

    return NextResponse.json({
        url: signedUrl,
        filename: uniqueFilename,
        publicUrl: `${process.env.R2_PUBLIC_DOMAIN}/${uniqueFilename}`
    });
}
