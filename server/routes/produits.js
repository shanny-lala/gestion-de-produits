const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const produitsController = require('../controllers/produitsController');

// Validation middleware
const validateProduit = [
  body('num_produit').notEmpty().withMessage('Numéro du produit est requis').trim(),
  body('design').notEmpty().withMessage('Design est requis').trim(),
  body('prix').isFloat({ min: 0 }).withMessage('Prix doit être un nombre positif'),
  body('quantite').isInt({ min: 0 }).withMessage('Quantité doit être un entier positif')
];

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Routes
router.get('/stats', produitsController.getStats);
router.get('/', produitsController.getAllProduits);
router.get('/:id', param('id').isInt(), checkValidationResult, produitsController.getProduitById);
router.post('/', validateProduit, checkValidationResult, produitsController.createProduit);
router.put('/:id', [param('id').isInt(), ...validateProduit], checkValidationResult, produitsController.updateProduit);
router.delete('/:id', param('id').isInt(), checkValidationResult, produitsController.deleteProduit);

module.exports = router;
