const express = require('express')
const router = express.Router()
const knex = require('../../../db')

// Route to access all products from database for listing in index / home page
router.get('/products', async (req, res) => {
  try {
    const products = await knex
      .select('*')
      .from('products')
      .orderBy('id', 'asc')
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Route to access a single product by ID
router.get('/products/:id', async (req, res) => {
  const { id } = req.params
  try {
    const product = await knex('products').where({ id }).first()
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
