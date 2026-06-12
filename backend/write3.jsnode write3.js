const fs = require('fs')
const code = [
"const express = require('express')",
"const { PrismaClient } = require('@prisma/client')",
"const Anthropic = require('@anthropic-ai/sdk')",
"const router = express.Router()",
"const prisma = new PrismaClient()",
"const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })",
"router.post('/', async (req, res) => {",
"  try {",
"    const { industry, workflow, userId } = req.body",
"    if (!industry || !workflow) return res.status(400).json({ message: 'Required' })",
"    const message = await anthropic.messages.create({ model: 'claude-sonnet-4-6', max_tokens: 1024, messages: [{ role: 'user', content: 'You are Souci AI coach. Analyze this ' + industry + ' workflow and return ONLY JSON with: automatable_tasks array, manual_tasks array, suggested_agents array with name/description/price/affiliateUrl/commission, roadmap_steps array with title/description/xp, time_saved string. Workflow: ' + workflow }] })",
"    const rawText = message.content[0].text",
"    const jsonMatch = rawText.match(/\\{[\\s\\S]*\\}/)",
"    if (!jsonMatch) return res.status(500).json({ message: 'Parse error' })",
"    const analysis = JSON.parse(jsonMatch[0])",
"    if (userId) { await prisma.workflow.create({ data: { description: workflow, tasks: analysis, userId } }) }",
"    res.json({ success: true, analysis })",
"  } catch (error) {",
"    console.log(error)",
"    res.status(500).json({ message: 'Analysis failed' })",
"  }",
"})",
"module.exports = router"
].join('\n')
fs.writeFileSync('routes/analyze.js', code)
console.log('Done')
