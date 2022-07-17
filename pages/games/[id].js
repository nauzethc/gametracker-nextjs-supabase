import { supabaseServerClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { useGames } from '../../hooks/games'
import { useRouter } from 'next/router'

import AppMenu from '../../components/common/app-menu'
import Modal from '../../components/common/modal'
import GameForm from '../../components/forms/game-form'
import Error from '../../components/common/error'
import GameHeader from '../../components/games/game-header'
import GameTracking from '../../components/games/game-tracking'

export default function GameDetail ({ id, data, error }) {
  const [showEditModal, setEditModal] = useState(false)
  const [showDeleteModal, setDeleteModal] = useState(false)
  const { state, update, remove } = useGames({ data, error })
  const router = useRouter()

  const handleEdit = async (formData) => {
    await update(id, formData)
    if (!state.error) setEditModal(false)
  }

  const handleDelete = async () => {
    await remove(id)
    if (!state.error) router.push('/games')
  }

  return (
    <div id="game-detail" className="grid">
      <Error error={state.error && state.error.message} />
      {state.data
        ? <div className="grid px-4 py-3 gap-4">
            <GameHeader data={state.data} />
            <GameTracking data={state.data} />
          </div>
        : null
      }
      <AppMenu>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-square btn-ghost">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
          </label>
          <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a href="#edit" onClick={() => setEditModal(true)}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                <span>Edit</span>
              </a>
            </li>
            <li>
              <a href="#delete" onClick={() => setDeleteModal(true)}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </div>
      </AppMenu>

      <Modal show={showEditModal} onClose={() => setEditModal(false)}>
        <GameForm initialData={state.data} onSubmit={handleEdit} isLoading={state.pending}>
          <div className="modal-action">
            <a href="#"
              className="btn btn-ghost"
              onClick={() => setEditModal(false)}>
              Cancel
            </a>
            {state.pending
              ? <button type="submit" className="btn btn-primary loading">
                  <span>Saving</span>
                </button>
              : <button type="submit" className="btn btn-primary gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                  <span>Save</span>
                </button>
            }
          </div>
        </GameForm>
      </Modal>

      <Modal show={showDeleteModal} onClose={() => setDeleteModal(false)}>
        <h3 className="font-bold text-lg">Are you sure to delete this game?</h3>
        <div className="modal-action">
          <a href="#" className="btn btn-ghost"
            onClick={() => setDeleteModal(false)}>
            Cancel
          </a>
          <a href="#" className="btn btn-outline btn-error" onClick={handleDelete}>
            Delete
          </a>
        </div>
      </Modal>
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps (context) {
    const { error, data } = await supabaseServerClient(context)
      .from('games')
      .select('*')
      .eq('id', context.params.id)
      .limit(1)
      .single()

    return {
      props: {
        id: context.params.id,
        data,
        error
      }
    }
  }
})
