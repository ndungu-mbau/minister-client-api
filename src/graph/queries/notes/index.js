const collection = "notes"

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
  userNote: {
    id: async (root, args, { hemera }) => {
      return root._id
    },
  },
}

export { list, single, nested }
