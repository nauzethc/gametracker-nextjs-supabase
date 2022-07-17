import { findGameById } from '../../../../services/igdb'

export default async function handler (req, res) {
  try {
    const { id } = req.query

    if (req.method === 'GET') {
      const game = await findGameById(id)
      if (!game) {
        res.status(404).send('Not Found')
      } else {
        res.status(200).json(game)
      }
    } else {
      res.status(405)
    }
  } catch (err) {
    console.error(err)
    res.status(500).text(err)
  }
}
