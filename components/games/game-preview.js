import { getGenres, getDevelopers } from '../../utils/games'
import Cover from '../common/cover'

export default function GamePreview ({ data = {}, className = '' }) {
  return (
    <div className={`game-preview flex gap-2 ${className}`}>
      <Cover className="w-24 flex-shrink-0 rounded-lg bg-base-100 text-base-content/30" src={data.cover} alt={data.name} />
      <div className="flex flex-col gap-2 px-4 w-full rounded-xl">
        <h2 className="text-lg font-extrabold">{data.name}</h2>
        <div className="text-base-content/70 text-sm flex flex-col gap-1">
          <span className="font-semibold">{getDevelopers(data.developers)}</span>
          <span>{new Date(data.release_date).toLocaleDateString()}</span>
          <span>{getGenres(data.genres)}</span>
        </div>
      </div>
    </div>
  )
}
