import { useEffect, useState } from 'react'
import { useAPI } from '../../hooks/api'
import { useQueryRoute } from '../../hooks/query'
import { useGames } from '../../hooks/games'

import Modal from '../../components/common/modal'
import Error from '../../components/common/error'
import SearchForm from '../../components/igdb/search-form'
import GameForm from '../../components/forms/game-form'
import GameResults from '../../components/igdb/game-results'
import GamePreview from '../../components/games/game-preview'
import Pagination from '../../components/common/pagination'
import Spinner from '../../components/common/spinner'

export default function AddGame ({ query: initialQuery }) {
  const igdb = useAPI('/api/igdb/games')
  const games = useGames()
  const [selected, setSelected] = useState()
  const [query, setQuery] = useQueryRoute(initialQuery)

  const handleSubmit = async (data) => {
    await games.create({ ...selected, ...data })
    if (!games.state.error) setSelected()
  }
  const handlePageChange = page => setQuery({ ...query, page })

  useEffect(() => {
    if (query.q && !igdb.state.pending) {
      igdb.retrieve(query)
    }
  }, [query])

  return (
    <div id="add-game" className="grid">
      <SearchForm
        className="bg-primary px-4 pb-4"
        initialData={query}
        onSubmit={setQuery}
        isLoading={igdb.state.pending}
        error={igdb.state.error}
        autofocus={true} />
      {igdb.state.pending
        ? <Spinner className="place-self-center m-4" />
        : <div className="grid gap-6 mb-6">
            <GameResults
              results={igdb.state.data}
              onTrack={setSelected} />
            <Pagination
              className="place-content-center"
              total={igdb.state.count}
              currentPage={query.page}
              pageSize={query.page_size}
              onPageChange={handlePageChange} />
          </div>
      }
      <Modal show={!!selected} onClose={() => setSelected(undefined)}>
        <GamePreview
          data={selected}
          className="mb-4" />
        <GameForm
          isLoading={games.state.pending}
          onSubmit={handleSubmit}
          initialData={{ ...selected }}
          platforms={selected ? selected.platforms : []} />
        <Error error={games.state.error && games.state.error.message} />
      </Modal>
    </div>
  )
}

export async function getServerSideProps (context) {
  return {
    props: {
      query: { ...context.query }
    }
  }
}
