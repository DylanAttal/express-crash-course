const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const members = require('../../Members')

// Get all members
router.get('/', (req, res) => {
  res.json(members)
})

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some((x) => x.id === parseInt(req.params.id))
  if (found) {
    res.json(members.filter((x) => x.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `Member with id ${req.params.id} not found` })
  }
})

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  }

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please provide name and email' })
  }

  members.push(newMember)

  res.json(members)
})

module.exports = router
