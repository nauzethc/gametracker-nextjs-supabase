import { DEFAULT_PAGE_SIZE } from '../config'

const IGDB_IMG_BASE_URL = 'https://images.igdb.com/igdb/image/upload'

function toDateISO (epoch = 0) {
  return epoch
    ? new Date(epoch * 1000).toISOString()
    : null
}

function getCategory (category) {
  switch (category) {
    case 0:
      return 'game'
    case 1:
      return 'dlc'
    case 2:
      return 'expansion'
    case 3:
      return 'bundle'
    case 4:
      return 'standalone_expansion'
    case 5:
      return 'mod'
    case 6:
      return 'episode'
    case 7:
      return 'season'
    case 8:
      return 'remake'
    case 9:
      return 'remaster'
    case 10:
      return 'expanded_game'
    case 11:
      return 'port'
    case 12:
      return 'fork'
    default:
      return 'unknown'
  }
}

function getGenres (genres = []) {
  return genres.map(genre => genre.name)
}

function getPlatformLogoUrl (platformLogo = {}) {
  return getImageURL(platformLogo.image_id, 'logo_med')
}

function getPlatforms (platforms = []) {
  return platforms.map(platform => ({
    name: platform.name,
    abbreviation: platform.abbreviation,
    logo: getPlatformLogoUrl(platform.platform_logo)
  }))
}

function getDevelopers (involvedCompanies = []) {
  return involvedCompanies
    .filter(({ developer }) => developer)
    .map(({ company }) => company.name)
}

function getPublishers (involvedCompanies = []) {
  return involvedCompanies
    .filter(({ publisher }) => publisher)
    .map(({ company }) => company.name)
}

function getCoverUrl (cover) {
  return (cover && cover.image_id)
    ? getImageURL(cover.image_id, 'cover_big')
    : null
}

export function getImageURL (hashId, size = 'screenshot_big') {
  return `${IGDB_IMG_BASE_URL}/t_${size}/${hashId}.jpg`
}

export function sanitizeGameRetrieve (igdbData = {}) {
  return {
    name: igdbData.name,
    slug: igdbData.slug,
    release_date: toDateISO(igdbData.first_release_date),
    summary: igdbData.summary,
    cover: getCoverUrl(igdbData.cover),
    igdb_rating: igdbData.total_rating,
    igdb_id: igdbData.id,
    igdb_url: igdbData.url,
    developers: getDevelopers(igdbData.involved_companies),
    publishers: getPublishers(igdbData.involved_companies),
    type: getCategory(igdbData.category),
    genres: getGenres(igdbData.genres),
    platforms: getPlatforms(igdbData.platforms)
  }
}

export function sanitizeGameQuery (query = {}) {
  const limit = Number(query.page_size || DEFAULT_PAGE_SIZE)
  const numPage = Number(query.page)
  const offset = (numPage - 1 > 0) ? (numPage - 1) * limit : 0
  const sort = query.order_by === 'name'
    ? 'name asc'
    : 'first_release_date desc'
  return { search: query.q, limit, offset, sort }
}
