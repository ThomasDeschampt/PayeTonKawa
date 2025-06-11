import { NextRequest, NextResponse } from 'next/server';

const SERVICE_URL = process.env.NEXT_PUBLIC_API_PRODUITS;

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';

    const res = await fetch(`${SERVICE_URL}/api/commandes/afficherAll`, {
      headers: { Authorization: authHeader }
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, message: text }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur interne', error: (error as Error).message }, { status: 500 });
  }
}
