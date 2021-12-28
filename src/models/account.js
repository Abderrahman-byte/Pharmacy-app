const bcrypt = require('bcrypt')

const getCreateAccount = (pool) => {
    return async ({ username, email, password, firstname, lastname }) => {
        const hashedPassword = bcrypt.hashSync(password, 10);

        const query = await pool.query(`INSERT INTO account (username, email, password, fname, lname) 
        VALUES ($1,$2,$3,$4,$5) RETURNING id`, [username, email, hashedPassword, firstname, lastname])

        return query?.rows?.length > 0 ? query?.rows[0] : null
    }
}

const getAccountByUserOrEmail = (pool) => {
    return async (id) => {
        const query = await pool.query(`SELECT id, username, fname as firstname, lname as lastname, email, password, created_date, updated_date, last_login 
        FROM account WHERE username = $1 OR email = $1`, [id])

        return query?.rows?.length > 0 ? query?.rows[0] : null
    }
}

const getAccountById = (pool) => {
    return async (id) => {
        const query = await pool.query(`SELECT id, username, fname as firstname, lname as lastname, email, is_admin, password, created_date, updated_date, last_login 
        FROM account WHERE id = $1`, [id])

        return query?.rows?.length > 0 ? query?.rows[0] : null
    }
}

const getAccountModels = (pool) => {
    return {
        createAccount: getCreateAccount(pool),
        getAccountByUserOrEmail: getAccountByUserOrEmail(pool),
        getAccountById: getAccountById(pool)
    }
}

module.exports = getAccountModels