import { NextRequest, NextResponse } from 'next/server';

const SERVICE_URL = process.env.PRODUIT_SERVICE_URL;

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const authHeader = req.headers.get('authorization') || '';

    const res = await fetch(`${SERVICE_URL}/api/produits/supprimer/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader
      }
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, message: text }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur interne', error: (error as Error).message },
      { status: 500 }
    );
  }
}
