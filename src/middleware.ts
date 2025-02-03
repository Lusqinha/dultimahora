import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const api_key = req.headers.get("x-api-key");

    if (api_key !== process.env.DULTIMA_API_KEY) {
        return new NextResponse(
            JSON.stringify(
                {success: false, message: "Autnticação inválida"}
            ),
            {status: 401, headers: {'content-type': 'application/json'}}
        )
    }
    return NextResponse.next()
}

export const config = {
    matcher: "/api/:path*",
}

