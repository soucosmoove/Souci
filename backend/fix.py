code = open('routes/analyze.js').read()
code = code.replace(
    'const analysis = JSON.parse(jsonStr)',
    'let analysis; try { analysis = JSON.parse(jsonStr) } catch(e) { console.log("JSON:", jsonStr.substring(0,200)); throw e }'
)
open('routes/analyze.js', 'w').write(code)
print('Done')f = open('routes/analyze.js', 'w')
lines = [
    "const express = require('express')",
    "const { PrismaClient } = require('@prisma/client')",
    "const Anthropic = require('@anthropic-ai/sdk')",
    "const router = express.Router()",
    "const prisma = new PrismaClient()",
    "const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })",
    "router.post('/', async (req, res) => {",
    "  try {",
    "    const { industry, workflow, userId } = req.body",
    "    const message = await anthropic.messages.create({ model: 'claude-sonnet-4-6', max_tokens: 2048, messages: [{ role: 'user', content: 'Analyze this ' + industry + ' workflow. Return ONLY valid JSON with keys: automatable_tasks (string array), manual_tasks (string array), suggested_agents (array with name/description/price/affiliateUrl/commission), roadmap_steps (array with title/description/xp), time_saved string. No markdown. No extra text. Workflow: ' + workflow }] })",
    "    const raw = message.content[0].text.trim()",
    "    const start = raw.indexOf('{')",
    "    const end = raw.lastIndexOf('}')",
    "    const analysis = JSON.parse(raw.substring(start, end + 1))",
    "    if (userId) { await prisma.workflow.create({ data: { description: workflow, tasks: analysis, userId } }) }",
    "    res.json({ success: true, analysis })",
    "  } catch (error) { console.log(error); res.status(500).json({ message: 'Analysis failed' }) }",
    "})",
    "module.exports = router"
]
f.write('\n'.join(lines))
f.close()
print('Done')

python3 fix.py



