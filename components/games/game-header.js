import Cover from '../common/cover'
import Field from '../common/field'
import { getDevelopers, getPublishers, getFormattedDate } from '../../utils/games'

export default function GameHeader ({ data = {}, className = '' }) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <Cover className="w-32 rounded-lg" src={data.cover} alt={data.name} />
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-extrabold overflow-ellipsis">{data.name}</h2>
        <Field label="Release date" value={getFormattedDate(data.release_date)} />
        <Field label="Developer" value={getDevelopers(data.developers)} />
        <Field label="Publisher" value={getPublishers(data.publishers)} />
      </div>
    </div>
  )
}
