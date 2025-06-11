import { NextRequest, NextResponse } from 'next/server';

const SERVICE_URL = process.env.NEXT_PUBLIC_API_PRODUITS;

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const body = await req.json();

    const res = await fetch(`${SERVICE_URL}/api/produits/ajouter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, message: text }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur interne', error: (error as Error).message }, { status: 500 });
  }
}
