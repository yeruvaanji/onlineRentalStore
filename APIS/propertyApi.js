const express = require('express');
const router = express.Router();
const Property = require('../models/property');

// Get all properties
router.get('/properties', (req, res) => {
  Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new property
router.post('/properties', (req, res) => {
  const newProperty = new Property(req.body);
  newProperty.save()
    .then(() => res.json('Property added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a property
router.put('/properties/:id', (req, res) => {
  Property.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Property updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a property
router.delete('/properties/:id', (req, res) => {
  Property.findByIdAndDelete(req.params.id)
    .then(() => res.json('Property deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
