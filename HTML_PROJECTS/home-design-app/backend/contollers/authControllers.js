const db = require('../models/db');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
  const { firstname, lastname, gender, phone, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const sql = 'INSERT INTO users (firstname, lastname, gender, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [firstname, lastname, gender, phone, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ message: 'User already exists or database error.' });
    res.status(201).json({ message: 'User registered successfully.' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'User not found.' });
    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).json({ message: 'Invalid password.' });
    res.status(200).json({ message: 'Login successful!' });
  });
};

exports.resetPassword = (req, res) => {
  const { email, newPassword } = req.body;
  const hashedPassword = bcrypt.hashSync(newPassword, 8);
  const sql = 'UPDATE users SET password = ? WHERE email = ?';

  db.query(sql, [hashedPassword, email], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(400).json({ message: 'User not found.' });
    res.status(200).json({ message: 'Password updated successfully.' });
  });
};
