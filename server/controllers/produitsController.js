const pool = require('../config/db');

// Obtenir tous les produits
exports.getAllProduits = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT *, (prix * quantite) AS montant FROM produits ORDER BY id DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// Obtenir un produit par ID
exports.getProduitById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT *, (prix * quantite) AS montant FROM produits WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// Ajouter un produit
exports.createProduit = async (req, res) => {
  try {
    const { num_produit, design, prix, quantite } = req.body;
    
    const result = await pool.query(
      'INSERT INTO produits (num_produit, design, prix, quantite) VALUES ($1, $2, $3, $4) RETURNING *, (prix * quantite) AS montant',
      [num_produit, design, prix, quantite]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    if (err.code === '23505') { // Code unique violation dans PG
      return res.status(400).json({ success: false, message: 'Ce numéro de produit existe déjà' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// Mettre à jour un produit
exports.updateProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const { num_produit, design, prix, quantite } = req.body;
    
    const result = await pool.query(
      'UPDATE produits SET num_produit = $1, design = $2, prix = $3, quantite = $4 WHERE id = $5 RETURNING *, (prix * quantite) AS montant',
      [num_produit, design, prix, quantite, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    if (err.code === '23505') {
      return res.status(400).json({ success: false, message: 'Ce numéro de produit existe déjà' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// Supprimer un produit
exports.deleteProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM produits WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    }
    
    res.json({ success: true, message: 'Produit supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// Statistiques (min, max, total)
exports.getStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COALESCE(MIN(prix * quantite), 0) AS montant_min,
        COALESCE(MAX(prix * quantite), 0) AS montant_max,
        COALESCE(SUM(prix * quantite), 0) AS montant_total
      FROM produits
    `);
    
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};
