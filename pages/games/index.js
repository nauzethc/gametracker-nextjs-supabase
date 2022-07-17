import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/auth'
import { supabase } from '../../lib/supabase'

import Link from 'next/link'
import Spinner from '../../components/common/spinner'
import Error from '../../components/common/error'
import GameList from '../../components/games/game-list'

export default function Games () {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData () {
      setLoading(true)
      try {
        const { error, data } = await supabase
          .from('games')
          .select('*')
          .eq('user_id', user.id)
          .order('finished_on')
        if (error) throw error
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user.id])

  return (
    <div id="all-games">
      <Error error={error && error.message} />
      {loading
        ? <Spinner />
        : <GameList data={data} />
      }
      <Link href="/games/add">
        <a className="btn btn-circle btn-accent shadow fixed bottom-0 right-0 m-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
        </a>
      </Link>
    </div>
  )
}
