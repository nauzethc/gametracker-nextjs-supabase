import { withPageAuth, supabaseServerClient, getUser } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import Error from '../components/common/error'
import GameList from '../components/home/game-list'

export default function Home ({ finishedGames, pendingGames }) {
  return (
    <div id="home">
      <Error error={finishedGames.error || pendingGames.error} />
      <GameList title="Pending" data={pendingGames.data} />
      <GameList title="Finished" data={finishedGames.data} />
      <Link href="/games/add">
        <a className="btn btn-circle btn-accent shadow fixed bottom-0 right-0 m-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
        </a>
      </Link>
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps (context) {
    const { user } = await getUser(context)

    const finishedGames = await supabaseServerClient(context)
      .from('games')
      .select('*')
      .match({ user_id: user.id, status: 'finished' })
      .order('finished_on')
      .limit(5)

    const pendingGames = await supabaseServerClient(context)
      .from('games')
      .select('*')
      .match({ user_id: user.id, status: 'pending' })
      .order('started_on')
      .limit(5)

    return {
      props: {
        finishedGames,
        pendingGames
      }
    }
  }
})
