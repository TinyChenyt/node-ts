import query from '../utils/msyql';

// export async function all() {
//     const res = await query(`SELECT * FROM tags`)
//     return res.results;
// }

async function all() {
    const res = await query(`SELECT * FROM tags`)
    return res.results;
}
module.exports = { all }