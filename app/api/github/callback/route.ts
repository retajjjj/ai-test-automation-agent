import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) {
        return NextResponse.redirect(new URL('/workspace?error=missing_code', req.url));
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = process.env.GITHUB_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
        return NextResponse.redirect(new URL('/workspace?error=github_not_configured', req.url));
    }

    const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
        })
    });

    const responseText = await res.json();
    const accessToken = responseText.access_token;


    if (!res.ok || !accessToken) {
        return NextResponse.redirect(new URL('/workspace?error=missing_access_token', req.url));
    }

    const response = NextResponse.redirect(new URL('/workspace', req.url));
    response.cookies.set('github_access_token', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production',path: '/', maxAge: 60 * 60 * 24 * 7, sameSite: 'lax' });
    return response;
}