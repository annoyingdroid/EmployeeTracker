const router = require('express').Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employees`;
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

router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employees WHERE id = ?`;
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

router.post('/employee', ({body}, res) => {
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'role_id',
        'manager_id'
    );
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    const params = [
        body.first_name,
        body.last_name,
        body.role_id,
        body.manager_id
    ];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

router.put('/employee', ({body}, res) => {
    const errors = inputCheck(body, 'employee_id');
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = 'UPDATE employees SET (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    const params = [
        body.first_name,
        body.last_name,
        body.role_id,
        body.manager_id
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

router.delete('/employee/:id', (req, res) => {
    const sql = 'DELETE FROM employees WHERE id = ?';

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