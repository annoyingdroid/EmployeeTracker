const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/department', (req, res) => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.post('/department', ({body}, res) => {
    const errors = inputCheck(
        body,
        'name'
    );
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }
    const sql = 'INSERT INTO departments (name) VALUES (?)';
    const params = [
        body.name
    ];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
        }
        res.json({
            message: 'success',
            data: result
        });
    });
});

router.put('/department', (req, res) => {
    const errors = inputCheck(req.body, 'department_id');
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = 'UPDATE departments SET (name) VALUES (?)';
    const params = [
        body.name
    ];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: errors})
        } else if(!result.affectedRows){
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: 'success',
                data: body,
                changes: result.affectedRows
            });
        }
    })
});

router.delete('/department/:id', (req, res) => {
    const sql = 'DELETE FROM departments WHERE id = ?';

    db.query(sql, req.params.id, (err, result) => {
        if(err) {
            res.status(400).json({error: res.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;