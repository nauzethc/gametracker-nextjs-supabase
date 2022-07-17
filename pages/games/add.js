import { useState } from 'react'
import { useAPI } from '../../../gametracker-nextjs/hooks/api'

import Modal from '../../components/common/modal'
import Error from '../../components/common/error'
import SearchForm from '../../components/forms/search-form'
import GameForm from '../../components/forms/game-form'
import GameResults from '../../components/igdb/game-results'
import GamePreview from '../../components/games/game-preview'
import { useGames } from '../../hooks/games'

export default function AddGame () {
  const igdb = useAPI('/api/igdb/games')
  const games = useGames()
  const [selected, setSelected] = useState()

  const handleSubmit = async (data) => {
    await games.create({ ...selected, ...data })
    if (!games.state.error) setSelected()
  }

  return (
    <div id="add-game">
      <SearchForm
        onSubmit={igdb.retrieve}
        isLoading={igdb.state.pending}
        error={igdb.state.error} />
      <GameResults
        results={igdb.state.data}
        onTrack={setSelected} />
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
