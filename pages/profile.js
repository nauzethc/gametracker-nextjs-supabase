import { getUser, supabaseServerClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { supabase } from '../lib/supabase'
import { useState } from 'react'

import Avatar from '../components/common/avatar'

export default function Profile ({ data, error: serverError }) {
  const [profile, setProfile] = useState(data)
  const [error, setError] = useState(serverError)

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="grid justify-center gap-4 px-4 py-3">
      <div className="card w-96 bg-base-100 shadow-xl relative">
        <figure className="px-10 pt-8">
          <Avatar url={profile.avatar_url} alt={profile.username} />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{profile.username}</h2>
          <p>Website</p>
        </div>
        <button className="btn btn-square btn-ghost absolute top-0 right-0 m-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
        </button>
      </div>

      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
          </div>
          <div className="stat-title">Total games</div>
          <div className="stat-value text-primary">24</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          </div>
          <div className="stat-title">Finished</div>
          <div className="stat-value text-secondary">20</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-accent">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M738.6 292H285.4C163 292 64 383 64 510.8c0 128 99 221.2 221.4 221.2h453c122.4 0 221.4-93.2 221.4-221.2 0.2-127.8-98.8-218.8-221.2-218.8zM400 533.4c0 5.4-4.8 10.6-10.4 10.6H320v70.2c0 5.6-6.2 9.8-11.6 9.8h-42.8c-5.2 0-9.6-3.8-9.6-9V544H185.8c-5.6 0-9.8-6.2-9.8-11.6v-42.8c0-5.2 3.8-9.6 9-9.6H256v-69.6c0-5.6 3.8-10.4 9.2-10.4h44.2c5.4 0 10.6 4.8 10.6 10.4V480h69.6c5.6 0 10.4 3.8 10.4 9.2v44.2z m239.6 17.6c-21.4 0-39-17.2-39-38.4s17.4-38.4 39-38.4 39 17.2 39 38.4-17.6 38.4-39 38.4z m85 83.6c-21.4 0-39-17-39-38.2 0-21.2 17.4-38.4 39-38.4s39 17 39 38.4c0 21.2-17.4 38.2-39 38.2z m0-167.4c-21.4 0-39-17.2-39-38.2 0-21.2 17.4-38.4 39-38.4s39 17.2 39 38.4c0 21-17.4 38.2-39 38.2z m85.2 83.8c-21.4 0-38.8-17.2-38.8-38.4s17.4-38.4 38.8-38.4 39 17.2 39 38.4c-0.2 21.2-17.6 38.4-39 38.4z" /></svg>
          </div>
          <div className="stat-title">Platforms</div>
          <div className="stat-value text-accent">5</div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps (context) {
    const { user } = await getUser(context)
    const { error, data } = await supabaseServerClient(context)
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      props: {
        error,
        data,
        user
      }
    }
  }
})
