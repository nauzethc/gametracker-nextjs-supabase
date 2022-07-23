import { getUser, supabaseServerClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

import Avatar from '../components/common/avatar'
import Error from '../components/common/error'
import Stats from '../components/profile/stats'

export default function Profile ({ profile, stats }) {
  const [profileData] = useState(profile.data)
  const [error] = useState(profile.error || stats.error)

  return (
    <div className="grid justify-center gap-4 px-4 py-3">
      <Error error={error} />
      <div className="card w-96 bg-base-100 shadow-xl relative">
        <figure className="px-10 pt-8">
          <Avatar url={profileData.avatar_url} alt={profileData.username} />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{profileData.username}</h2>
        </div>
      </div>
      <Stats data={stats.data} className="stats-vertical shadow" />
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps (context) {
    const { user } = await getUser(context)
    const profile = await supabaseServerClient(context)
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    const stats = await supabaseServerClient(context)
      .from('games')
      .select('status, gameplay_type, platform_name', { count: 'estimated' })
      .eq('user_id', user.id)

    return {
      props: {
        profile,
        stats,
        user
      }
    }
  }
})
