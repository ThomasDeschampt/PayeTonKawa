import { NextRequest, NextResponse } from 'next/server';

const SERVICE_URL = process.env.NEXT_PUBLIC_API_CLIENTS;

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const body = await req.json();

    const res = await fetch(`${SERVICE_URL}/api/clients/verifier`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const data = await res.json();

      const response = NextResponse.json(data, { status: res.status });
      if (data.token) {
        response.cookies.set({
          name: 'token',
          value: data.token,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 2,
        });
      }

      return response;
    } else {
      const rawBody = await res.text();
      return NextResponse.json({ success: false, message: rawBody }, { status: res.status });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur interne',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
