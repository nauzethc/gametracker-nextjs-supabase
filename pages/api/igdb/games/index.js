import { findGamesByName } from '../../../../services/igdb'

export default async function handler (req, res) {
  if (!req.query.q) {
    res.status(400).json({ message: 'Invalid request: "q" param is mandatory' })
  } else {
    try {
      const games = await findGamesByName(req.query.q)
      res.status(200).json(games)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
