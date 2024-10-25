CREATE TABLE IF NOT EXISTS sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(50) NOT NULL UNIQUE,
    power INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO sites (site_name, power) VALUES
    ('VIOTAS', 1000),
    ('Texas Stake House', 3211);