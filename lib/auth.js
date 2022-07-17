export async function getUser (req) {
  const token = req.cookies['sb:token']

  if (!token) {
    return {
      user: null,
      data: null,
      error: 'Ther is no Supabase token in request cookies'
    }
  }

  const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      APIKey: process.env.SUPABASE_ANON_KEY || ''
    }
  })

  const result = await res.json()

  if (res.status !== 200) {
    return {
      user: null,
      data: null,
      error: `Supabase auth returned ${res.status}. See logs for details`
    }
  } else if (result.auth === 'authenticated') {
    return {
      user: result,
      data: result,
      error: null
    }
  } else {
    return {
      user: null,
      data: null,
      error: 'Unauthorized'
    }
  }
}
