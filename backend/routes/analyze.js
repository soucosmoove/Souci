const express = require('express')
const Anthropic = require('@anthropic-ai/sdk')
const router = express.Router()
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

router.post('/', async (req, res) => {
  try {
    const { industry, workflow } = req.body
    
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: 'Analyze this ' + industry + ' workflow. Return ONLY a JSON object. No markdown, no backticks, no extra text. JSON must have: automatable_tasks (string array), manual_tasks (string array), suggested_agents (array of objects with name, description, price, affiliateUrl, commission), roadmap_steps (array of objects with title, description, xp number), time_saved (string). Workflow: ' + workflow
      }]
    })

    const raw = message.content[0].text.trim()
    const start = raw.indexOf('{')
    const end = raw.lastIndexOf('}')
    const analysis = JSON.parse(raw.substring(start, end + 1))
    res.json({ success: true, analysis })

  } catch (error) {
    console.log('ERROR:', error.message)
    res.status(500).json({ message: 'Analysis failed' })
  }
})

module.exports = router