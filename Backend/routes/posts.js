const express = require('express');
const { pool } = require('../database');
const router = express.Router();

// Ruta GET para obtener todos los registros de la tabla posts
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM posts';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
});

// Ruta POST para almacenar un nuevo registro en la tabla posts
router.post('/', async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    try {
        const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [titulo, img, descripcion, 0]; // 0 likes inicialmente
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear el post:', error);
        res.status(500).json({ error: 'Error al crear el post' });
    }
});

// Ruta PUT para modificar un registro en la tabla posts por su id
router.put('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const query = 'UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *';
        const values = [req.body.titulo, req.body.img, req.body.descripcion, postId];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al modificar el post:', error);
        res.status(500).json({ error: 'Error al modificar el post' });
    }
});

// Ruta DELETE para eliminar un registro en la tabla posts por su id
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const query = 'DELETE FROM posts WHERE id = $1';
        await pool.query(query, [postId]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
});

module.exports = router;
