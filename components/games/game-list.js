import { capitalize, getStatusDetail } from '../../utils/games'

import Cover from '../common/cover'
import StatusIcon from '../common/status-icon'
import GameplayIcon from '../common/gameplay-icon'
import Link from 'next/link'
import AchievementsBar from '../common/achievements-bar'
import PinnedIcon from '../common/pinned-icon'

function GameItem ({ data }) {
  return (
    <div className="game-item flex gap-6 p-4 bg-base-100">
      <Cover
        className="w-24 flex-shrink-0 flex-grow-0 rounded-lg bg-base-100 text-base-content/30"
        src={data.cover}
        alt={data.name} />
      <div className="grid gap-y-2 gap-x-6 w-full sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        <h2 className="text-lg leading-6 font-extrabold gap-y-1 sm:col-span-2 md:col-span-1 lg:col-span-2">
          <Link href={`/games/${data.id}`}>
            <a>{data.fixed ? <PinnedIcon className="w-5 h-5 mr-2" value={true} /> : null}{data.name}</a>
          </Link>
        </h2>
        <div className="flex items-start gap-2 sm:col-span-2 md:col-span-1 lg:col-span-2">
          <StatusIcon status={data.status} className="text-base-content" />
          <span>{getStatusDetail(data)}</span>
        </div>
        <div className="flex items-center gap-2">
          <GameplayIcon type={data.gameplay_type} className="text-base-content" />
          <span>{capitalize(data.gameplay_type)}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-base-content" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
          <span>{data.total_hours}h</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-base-content" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M793.6 170.666667c2.844444-28.444444 2.844444-54.044444 2.844444-85.333334H227.555556c0 31.288889 0 56.888889 2.844444 85.333334H56.888889v28.444444c0 253.155556 321.422222 432.355556 398.222222 472.177778V768c0 48.355556-36.977778 85.333333-85.333333 85.333333h-56.888889v113.777778h398.222222v-113.777778h-56.888889c-48.355556 0-85.333333-36.977778-85.333333-85.333333v-96.711111c76.8-39.822222 398.222222-219.022222 398.222222-472.177778V170.666667h-173.511111zM116.622222 227.555556h119.466667c11.377778 128 42.666667 219.022222 76.8 284.444444-91.022222-71.111111-184.888889-170.666667-196.266667-284.444444z m597.333334 284.444444c34.133333-65.422222 65.422222-156.444444 76.8-284.444444H910.222222c-14.222222 113.777778-108.088889 213.333333-196.266666 284.444444z" fill="currentColor" /></svg>
          <AchievementsBar value={data.achievements_percent} />
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-base-content" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M738.6 292H285.4C163 292 64 383 64 510.8c0 128 99 221.2 221.4 221.2h453c122.4 0 221.4-93.2 221.4-221.2 0.2-127.8-98.8-218.8-221.2-218.8zM400 533.4c0 5.4-4.8 10.6-10.4 10.6H320v70.2c0 5.6-6.2 9.8-11.6 9.8h-42.8c-5.2 0-9.6-3.8-9.6-9V544H185.8c-5.6 0-9.8-6.2-9.8-11.6v-42.8c0-5.2 3.8-9.6 9-9.6H256v-69.6c0-5.6 3.8-10.4 9.2-10.4h44.2c5.4 0 10.6 4.8 10.6 10.4V480h69.6c5.6 0 10.4 3.8 10.4 9.2v44.2z m239.6 17.6c-21.4 0-39-17.2-39-38.4s17.4-38.4 39-38.4 39 17.2 39 38.4-17.6 38.4-39 38.4z m85 83.6c-21.4 0-39-17-39-38.2 0-21.2 17.4-38.4 39-38.4s39 17 39 38.4c0 21.2-17.4 38.2-39 38.2z m0-167.4c-21.4 0-39-17.2-39-38.2 0-21.2 17.4-38.4 39-38.4s39 17.2 39 38.4c0 21-17.4 38.2-39 38.2z m85.2 83.8c-21.4 0-38.8-17.2-38.8-38.4s17.4-38.4 38.8-38.4 39 17.2 39 38.4c-0.2 21.2-17.6 38.4-39 38.4z" fill="currentColor" /></svg>
          <span>{data.platform_name}</span>
        </div>
      </div>
    </div>
  )
}

export default function GameList ({ data = [] }) {
  return (
    <div className="game-list grid gap-1 md:grid-cols-2">
      {Array.isArray(data)
        ? data.map(game => <GameItem key={game.id} data={game} />)
        : null
      }
    </div>
  )
}
