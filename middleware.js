// middleware.js
import { NextResponse } from 'next/server';

const BASIC_AUTH_USER = 'yourUsername';
const BASIC_AUTH_PASS = 'yourPassword';

export function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');

    if (username === BASIC_AUTH_USER && password === BASIC_AUTH_PASS) {
      return NextResponse.next();
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
