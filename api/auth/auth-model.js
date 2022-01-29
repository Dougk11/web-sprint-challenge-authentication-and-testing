const db = require('../../data/dbConfig')

function getUsers() {
    return db('users')
}

async function getUserById(id) {
    return await db('users as u')
        .where({id})
        .first()
}

async function insert(user) {
    const [id] = await db('users').insert(user)
    return getUserById(id)
}

async function remove(id) {
    return await db('users')
        .where({id}).del()
}

async function findBy(search) {
    return await db('users').where(search).first()
}

module.exports = {
    getUsers,
    getUserById,
    insert,
    remove,
    findBy
}