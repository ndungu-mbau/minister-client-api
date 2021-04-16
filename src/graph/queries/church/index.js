const collection = "church"

const single = async (args, { church, hemera }) => {
  const { data } = await hemera.act({
    topic:'db-service',
    cmd:'find-one',
    collection,
    params:{
      id: church
    }
  })

  return data
}

const nested = {
  [collection]: {
    devotions: async (root, { archived = false }, { hemera }) => {
      const { data } = await hemera.act({
        topic: 'db-service',
        cmd: 'find',
        collection: 'devotion',
        params: {
          church: root.id,
          archived
        }
      })

      return data
    },
    sermons: async (root, { archived = false }, { hemera }) => {
      const { data } = await hemera.act({
        topic: 'db-service',
        cmd: 'find',
        collection: 'sermon',
        params: {
          church: root.id,
          archived
        }
      })

      return data
    },
    events: async (root, { archived = false}, { hemera }) => {
      const { data } = await hemera.act({
        topic: 'db-service',
        cmd: 'find',
        collection: 'event',
        params: {
          church: root.id,
          archived
        }
      })

      return data
    },
    notices: async (root, { archived = false }, { hemera }) => {
      const { data } = await hemera.act({
        topic: 'db-service',
        cmd: 'find',
        collection: 'notice',
        params: {
          church: root.id,
          archived
        }
      })

      return data
    },
    members: async (root, { archived = false }, { hemera }) => {
      const { data } = await hemera.act({
        topic: 'db-service',
        cmd: 'find',
        collection: 'users',
        params: {
          church: root.id,
          archived
        }
      })

      return data
    },
  }
}

export { single, nested }
