export const register = async (req, res, hemera) => {
  const { church, name, contact, password } = req.body

  const {
    data: { token },
  } = await hemera.act({
    topic: "auth-service",
    cmd: "create-user",
    name,
    contact,
    church,
    password,
  })

  res.cookie("token", token)
  res.json({ token })
}

export const login = async (req, res, hemera) => {
  const { contact, password } = req.body

  const {
    data: { token, ok, message },
  } = await hemera.act({
    topic: "auth-service",
    cmd: "login-user",
    contact,
    password,
  })

  if (ok) {
    res.cookie("token", token)
    res.json({ ok, token })
  } else {
    res.json({ ok, message })
  }
}

export const authMiddleware = async (req, res, next, hemera) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"] // Express headers are auto converted to lowercase
  if (!token) return res.json({ ok: false, message: "Not Authenticated" })

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }

  const { data: user } = await hemera.act({
    topic: "auth-service",
    cmd: "verify-jwt",
    token,
  })

  req.user = user
  next()
}
