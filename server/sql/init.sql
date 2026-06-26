CREATE TABLE IF NOT EXISTS produits (
    id SERIAL PRIMARY KEY,
    num_produit VARCHAR(20) UNIQUE NOT NULL,
    design VARCHAR(100) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL CHECK (prix >= 0),
    quantite INTEGER NOT NULL CHECK (quantite >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_produits_num ON produits(num_produit);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_timestamp ON produits;

CREATE TRIGGER trigger_update_timestamp
    BEFORE UPDATE ON produits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Insert dummy data for initialization
INSERT INTO produits (num_produit, design, prix, quantite) VALUES
('P-2319', 'Zenith Smartband', 149.99, 85),
('P-2320', 'Quantum Flux Watch', 199.99, 45),
('P-2321', 'Apex Desk Chair', 249.50, 20),
('P-2322', 'Neon Keyboard', 89.99, 110)
ON CONFLICT (num_produit) DO NOTHING;
