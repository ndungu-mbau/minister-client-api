const collection = "notes"

const create = async (args, { hemera }) => {
  const entry = args[collection]

  const { data } = await hemera.act({
    topic:'db-service',
    cmd:'insert-one',
    collection,
    obj: {
      ...entry,
      archived: false
    }
  })
  return { ...data, id: data._id }
}

const update = async (args, { hemera }) => {
  const entry = args[collection]
  const { id: _id } = entry

  const { data } = await await hemera.act({
    topic:'db-service',
    cmd:'update-one',
    collection,
    params: {
      _id,
      ...entry,
    }
  })
  return data
}

const archive = async (args, { hemera }) => {
  const { id: _id } = args[collection]

  const { data } = await await hemera.act({
    topic:'db-service',
    cmd:'update-one',
    collection,
    params: {
      _id,
      archived: true,
    }
  })
  return data
}

const restore = async (args, { hemera }) => {
  const { id: _id } = args[collection]

  const { data } = await await hemera.act({
    topic:'db-service',
    cmd:'update-one',
    collection,
    params: {
      _id,
      archived: false,
    }
  })
  return data
}

export default () => ({
  create,
  update,
  archive,
  restore
})