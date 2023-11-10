const tag = require('../models/Tags.ts');

// const tagController = {
//     getTagsList : async () => {
//         const tags = await tag.all();
//         return tags;
//     }
// }

async function getTagsList(ctx: { body: { code: number; msg: string; data: any; }; }) {
    const tags = await tag.all();
    ctx.body = {
        code: 200,
        msg: '获取成功',
        data: tags
    }
}
module.exports = { getTagsList }
// export default { getTagsList };