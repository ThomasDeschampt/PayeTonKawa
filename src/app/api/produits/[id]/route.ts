import { NextRequest, NextResponse } from 'next/server';

const SERVICE_URL = process.env.NEXT_PUBLIC_API_PRODUITS;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const { id } = await params;
    const res = await fetch(`${SERVICE_URL}/api/produits/afficher/${id}`, {
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const { id } = params;
    const body = await req.json();

    const res = await fetch(`${SERVICE_URL}/modifier/${id}`, {
      method: 'PUT',
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

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur interne', error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const { id } = params;

    const res = await fetch(`${SERVICE_URL}/supprimer/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader
      }
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, message: text }, { status: res.status });
    }

    return NextResponse.json({ success: true, message: 'Produit supprimé' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur interne', error: (error as Error).message }, { status: 500 });
  }
}
