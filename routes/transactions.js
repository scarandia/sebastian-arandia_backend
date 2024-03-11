const express = require('express');
const router = express.Router();
const { filterTransactionsByEmailAndType } = require('../BackEnd/controllers/dbFilters');

router.get('/', (req, res) => {
    const { email, type } = req.query;
    const transactions = filterTransactionsByEmailAndType(email, type);

    if (transactions === null) {
        return res.status(404).json({ error: 'Client not found or data is invalid.' });
    }

    res.json({ transactions });
});

module.exports = router;
