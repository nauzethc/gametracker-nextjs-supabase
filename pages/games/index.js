import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useGames, withGames } from '../../hooks/games'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDidMount } from '../../hooks/lifecycle'

import AppMenu from '../../components/common/app-menu'
import Link from 'next/link'
import Spinner from '../../components/common/spinner'
import Error from '../../components/common/error'
import GameList from '../../components/games/game-list'
import SearchForm from '../../components/games/search-form'
import Pagination from '../../components/common/pagination'

export default function Games ({ error, data, query: initialQuery, count }) {
  const didMount = useDidMount()
  const [collapsed, toggleForm] = useState(true)
  const [query, setQuery] = useState(initialQuery)
  const { state, find } = useGames({ error, data, count })
  const router = useRouter()

  const handleSubmit = (query) => setQuery(query)
  const handlePageChange = (page) => setQuery({ ...query, page })

  useEffect(() => {
    if (didMount) {
      router.push({ pathname: '/games', query }, undefined, { shallow: true })
      find(query)
    }
  }, [query])

  return (
    <div id="all-games" className="flex flex-col h-full">
      <SearchForm className={`px-4 pb-4 ${collapsed ? 'collapsed' : ''}`}
        initialData={query}
        onSubmit={handleSubmit}
        isLoading={state.pending} />
      { state.pending
        ? <Spinner className="place-self-center m-4" />
        : <div className="flex-grow flex flex-col gap-6 overflow-y-auto pb-6">
            <Error error={state.error} />
            <GameList data={state.data} />
            <Pagination
              className="place-content-center"
              total={state.count}
              currentPage={query.page}
              pageSize={query.page_size}
              onPageChange={handlePageChange} />
          </div>
      }

      <Link href="/games/add">
        <a className="btn btn-circle btn-accent shadow fixed bottom-0 right-0 m-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
        </a>
      </Link>

      <AppMenu>
        <button className="btn btn-square btn-ghost" onClick={() => toggleForm(!collapsed)}>
          {collapsed
            ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          }
        </button>
      </AppMenu>
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps (context) {
    const { find } = withGames(context)
    const { error, data, count } = await find(context.query)
    return {
      props: {
        error,
        data,
        count,
        query: { ...context.query }
      }
    }
  }
})
