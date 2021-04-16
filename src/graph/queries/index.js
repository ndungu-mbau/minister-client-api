import {
  list as devotions,
  single as devotion,
  nested as Ndevotion,
} from './devotions'

import {
  list as sermons,
  single as sermon,
  nested as Nsermon,
} from './sermons'

import {
  list as events,
  single as event,
  nested as Nevent,
} from './events'

import {
  list as notices,
  single as notice,
  nested as Nnotice,
} from './notices'

import {
  single as church,
  nested as Nchurch,
} from './church'

import {
  list as notes,
  single as note,
  nested as Nnote,
} from './notes'

const nested = {}

Object.assign(
  nested,

  Ndevotion,
  Nchurch,
  Nevent,
  Nnote,
  Nnotice,
  Nsermon,
)

const Query = {
  hello: () => "Hello, world",
  
  devotions,
  devotion,

  sermons,
  sermon,

  notices,
  notice,

  events,
  event,

  notes,
  note,

  church
}

export {
  Query,
  nested
}
