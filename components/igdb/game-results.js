import Cover from '../common/cover'

function getReleaseYear (timestamp) {
  return timestamp
    ? new Date(timestamp).getFullYear()
    : 'Unreleased'
}

function getDevelopers (developers = []) {
  return developers.length > 0
    ? developers.join(', ')
    : 'Unknown developer'
}

function getGenres (genres = []) {
  return genres.length > 0
    ? genres.join(', ')
    : 'Unknown genre'
}

function GameItem ({ data, onTrack }) {
  return (
    <div className="game-item flex gap-4 bg-base-100 p-2 rounded-xl">
      <Cover className="w-24 flex-shrink-0 rounded-lg bg-base-100 text-base-content/30" src={data.cover} alt={data.name} />
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-lg font-extrabold">
          {data.name} ({getReleaseYear(data.release_date)})
        </h2>
        <div className="text-base-content/70 text-sm flex flex-col gap-1">
          <span className="font-semibold">{getDevelopers(data.developers)}</span>
          <span>{getGenres(data.genres)}</span>
        </div>
        <div className="flex flex-wrap gap-1 my-2">
          {data.platforms.map(({ abbreviation, name }) =>
            <span key={name} className="badge badge-ghost">{abbreviation || name}</span>)
          }
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary btn-outline btn-sm gap-2" onClick={() => onTrack(data)}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" /></svg>
            <span>Track</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GameResults ({ results = [], onTrack }) {
  const handleTrack = (game) => {
    if (typeof onTrack === 'function') onTrack(game)
  }
  return (
    <div className="game-results grid md:grid-cols-2 py-4 px-2 gap-y-4 gap-x-6">
      {Array.isArray(results)
        ? results.map(game => <GameItem key={game.igdb_id} data={game} onTrack={handleTrack} />)
        : null
      }
    </div>
  )
}
