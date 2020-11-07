// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
    api.chainWebpack((config, {isServer}) => {
        if (isServer) {
            config.externals([
                nodeExternals({
                    allowlist: [/^vuetify/]
                })
            ])
        }
    },)

    api.loadSource(async actions => {
        const {data} = await axios.get('http://localhost:1337/posts')

        const collection = actions.addCollection({
           typeName: 'Post',
            path: '/post/:id'
        })
        for (const post of data) {
            collection.addNode({
                id: post.id,
                path: '/post/' + post.id,
                title: post.title,
                date: post.date,
                duration: post.duration,
                price: post.price,
                imag: post.imag[0].url,
                description: post.description,
                categories: post.categories[0].id
            })
        }
    })

}
