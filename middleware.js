import { NextResponse } from 'next/server'

async function getUser (req) {
  const token = req.cookies.get('sb-access-token')
  if (!token) {
    return {
      user: null,
      data: null,
      error: 'Ther is no Supabase token in request cookies'
    }
  }

  const authRequestResult = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    }
  })

  const result = await authRequestResult.json()

  if (authRequestResult.status !== 200) {
    return {
      user: null,
      data: null,
      error: `Supabase auth returned ${authRequestResult.status}. See logs for details`
    }
  } else if (result.aud === 'authenticated') {
    return {
      user: result,
      data: result,
      error: null
    }
  }
}

export default async function middleware (req, ev) {
  const authResult = await getUser(req)
  if (authResult.error) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin))
  } else if (!authResult.user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin))
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/api/igdb/:path*',
    '/games/:path*',
    '/'
  ]
}
