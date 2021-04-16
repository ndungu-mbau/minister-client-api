const collection = "sermon"

const list = async (root, { archived = false }, { church, hemera }) => {
  const { data } = await hemera.act({
    topic:'db-service',
    cmd:'find',
    collection,
    params: { church, archived }
  })

  return data
}

const single = async (root, { _id }, { hemera }) => {
  const { data } = await hemera.act({
    topic:'db-service',
    cmd:'find-one',
    collection,
    params: { _id }
  })

  return data
}

const nested = {
  [collection]: {
    id: async (root, args, { hemera }) => {
      return root._id
    },
    church: async (root, args, { hemera }) => {
      const { data } = await hemera.act({
        topic: 'db-service',
        cmd: 'find-one',
        collection: 'church',
        params: {
          id: root.church
        }
      })

      return data
    }
  },
}

export { list, single, nested }
