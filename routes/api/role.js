const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/role', (req, res) => {
    const sql = `SELECT * FROM roles`;
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

router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
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

router.post('/role', ({body}, res) => {
    const errors = inputCheck(
        body,
        'title',
        'salary',
        'department_id'
    );
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
    const params = [
        body.title,
        body.salary,
        body.department_id
    ];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
        } else {
            res.json({
                message: 'success',
                data: body
            });
        }
    });
});

router.put('/role', (req, res) => {
    const errors = inputCheck(req.body, 'role_id');
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = 'UPDATE roles SET (title, salary, department_id) VALUES (?,?,?)';
    const params = [
        body.title,
        body.salary,
        body.department_id
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

router.delete('/role/:id', (req, res) => {
    const sql = 'DELETE FROM roles WHERE id = ?';

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