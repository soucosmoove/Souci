const fs = require('fs')

const code = [
  "const express = require('express')",
  "const bcrypt = require('bcryptjs')",
  "const jwt = require('jsonwebtoken')",
  "const { PrismaClient } = require('@prisma/client')",
  "const router = express.Router()",
  "const prisma = new PrismaClient()",
  "router.post('/signup', async (req, res) => {",
  "  try {",
  "    const { email, password, industry } = req.body",
  "    const existingUser = await prisma.user.findUnique({ where: { email } })",
  "    if (existingUser) return res.status(400).json({ message: 'Email already registered' })",
  "    const hashedPassword = await bcrypt.hash(password, 10)",
  "    const user = await prisma.user.create({ data: { email, password: hashedPassword, industry } })",
  "    const token = jwt.sign({ userId: user.id }, 'souci-secret', { expiresIn: '7d' })",
  "    res.status(201).json({ message: 'Welcome to Souci', token, user: { id: user.id, email: user.email } })",
  "  } catch (error) { res.status(500).json({ message: 'Error' }) }",
  "})",
  "router.post('/login', async (req, res) => {",
  "  try {",
  "    const { email, password } = req.body",
  "    const user = await prisma.user.findUnique({ where: { email } })",
  "    if (!user) return res.status(400).json({ message: 'No account found' })",
  "    const validPassword = await bcrypt.compare(password, user.password)",
  "    if (!validPassword) return res.status(400).json({ message: 'Incorrect password' })",
  "    const token = jwt.sign({ userId: user.id }, 'souci-secret', { expiresIn: '7d' })",
  "    res.json({ message: 'Welcome back', token, user: { id: user.id, email: user.email } })",
  "  } catch (error) { res.status(500).json({ message: 'Error' }) }",
  "})",
  "module.exports = router"
].join('\n')

fs.writeFileSync('routes/auth.js', code)
console.log('auth.js written successfully')

