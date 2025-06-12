import { jwtVerify, JWTPayload } from 'jose';

const SECRET = process.env.NEXT_PUBLIC_TOKEN || '';

function getJwtSecretKey() {
  if (!SECRET) throw new Error('JWT secret key is missing');
  return new TextEncoder().encode(SECRET);
}

interface CustomJwtPayload extends JWTPayload {
  id: string;
  pseudo: string;
}

export async function verifyJwtToken(token: string): Promise<CustomJwtPayload | undefined> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as CustomJwtPayload;
  } catch {
    return undefined;
  }
}
