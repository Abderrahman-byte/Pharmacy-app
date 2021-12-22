const bcrypt = require('bcrypt')

const getCreateAccount = (pool) => {
    return async ({ username, email, password, firstname, lastname }) => {
        const hashedPassword = bcrypt.hashSync(password, 10);

        const query = await pool.query(`INSERT INTO account (username, email, password, fname, lname) 
        VALUES ($1,$2,$3,$4,$5) RETURNING id`, [username, email, hashedPassword, firstname, lastname])

        return query?.rows?.length > 0 ? query?.rows[0] : null
    }
}

const getAccountModels = (pool) => {
    return {
        createAccount: getCreateAccount(pool)
    }
}

module.exports = getAccountModels