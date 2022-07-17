export function clamp (min, max, value) {
  if (value < min) return min
  if (value > max) return max
  return value
}

export function capitalize (str = '') {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

export function getType (type) {
  switch (type) {
    case 'game':
      return 'Game'
    case 'dlc':
      return 'DLC'
    case 'expansion':
      return 'Expansion'
    case 'bundle':
      return 'Bundle'
    case 'standalone_expansion':
      return 'Stand-alone Expansion'
    case 'mod':
      return 'Mod'
    case 'episode':
      return 'Episode'
    case 'season':
      return 'Season'
    case 'remake':
      return 'Remake'
    case 'remaster':
      return 'Remaster'
    case 'expanded_game':
      return 'Expanded Game'
    case 'port':
      return 'Port'
    case 'fork':
      return 'Fork'
    default:
      return 'Unknown'
  }
}

export function getStatus (status = 'unknown') {
  return capitalize(status)
}

export function getStatusDetail ({ status, finished_on, started_on, updated_at }) {
  if (status === 'finished') {
    return `Finished on ${new Date(finished_on).toLocaleDateString()}`
  } else if (status === 'abandoned') {
    return `Abandoned on ${new Date(finished_on || updated_at).toLocaleDateString()}`
  } else {
    return `Pending, started on ${new Date(started_on).toLocaleDateString()}`
  }
}

export function getReleaseYear (timestamp) {
  return timestamp
    ? new Date(timestamp).getFullYear()
    : 'Unreleased'
}

export function getFormattedDate (timestamp) {
  return timestamp
    ? new Date(timestamp).toLocaleDateString()
    : 'Unknown'
}

export function getDevelopers (developers = []) {
  return developers.length > 0
    ? developers.join(', ')
    : 'Unknown developer'
}

export function getPublishers (publishers = []) {
  return publishers.length > 0
    ? publishers.join(', ')
    : 'Unknown publisher'
}

export function getGenres (genres = []) {
  return genres.length > 0
    ? genres.join(', ')
    : 'Unknown genre'
}

const REDUCERS = {
  started_on (value) {
    return new Date(value)
  },
  finished_on (value = Date.now()) {
    return new Date(value)
  },
  release_date (value) {
    return value ? new Date(value) : null
  },
  status (value = 'pending') {
    const valid = ['pending', 'finished', 'abandoned']
    return valid.includes(value) ? value : 'pending'
  },
  gameplay_type (value = 'main') {
    const valid = ['main', 'extendend', 'completionist', 'speedrun']
    return valid.includes(value) ? value : 'main'
  },
  total_hours (value = 0) {
    return Number(value)
  },
  achievements_percent (value = 0) {
    return clamp(0, 100, Number(value))
  },
  comment (value = '') {
    return String(value)
  },
  rating (value = 0) {
    return Number(value)
  }
}

export function sanitizeGameCreate (data = {}) {
  const fields = [
    'name',
    'slug',
    'release_date',
    'summary',
    'cover',
    'igdb_rating',
    'igdb_id',
    'igdb_url',
    'started_on',
    'finished_on',
    'total_hours',
    'achievements_percent',
    'comment',
    'rating',
    'user_id',
    'developers',
    'publishers',
    'genres',
    'platform_name',
    'platform_abbreviation',
    'platform_logo',
    'status',
    'gameplay_type',
    'type'
  ]
  return Object.fromEntries(
    fields.map(field => [
      field,
      typeof REDUCERS[field] === 'function'
        ? REDUCERS[field](data[field])
        : data[field]
    ])
  )
}

export function sanitizeGameUpdate (data = {}) {
  const fields = [
    'started_on',
    'finished_on',
    'total_hours',
    'achievements_percent',
    'comment',
    'rating',
    'platform_name',
    'platform_abbreviation',
    'platform_logo',
    'status',
    'gameplay_type',
    'updated_at'
  ]
  return Object.fromEntries(
    Object.entries(data)
      .filter(([field]) => fields.includes(field))
      .map(([field, value]) => [
        field,
        typeof REDUCERS[field] === 'function'
          ? REDUCERS[field](value)
          : value
      ])
  )
}
