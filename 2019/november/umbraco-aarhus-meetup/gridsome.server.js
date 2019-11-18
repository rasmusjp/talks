const axios = require('axios')

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    const { data: slideShowsData } = await axios.get(
      'https://cdn.umbraco.io/content/type?contentType=slideShow',
      {
        headers: { 'Umb-Project-Alias': 'aarhus-meetup' }
      }
    )

    const slideShows = addCollection({
      typeName: 'Slideshow'
    })

    const slides = addCollection({
      typeName: 'Slide'
    })

    slideShows.addReference('slides', 'Slide')

    for (const item of slideShowsData._embedded.content) {
      const { data: children } = await axios.get(
        `https://cdn.umbraco.io/content/${item._id}/children/`,
        {
          headers: { 'Umb-Project-Alias': 'aarhus-meetup' }
        }
      )

      for (const child of children._embedded.content) {
        slides.addNode({ id: child._id, ...child })
      }

      slideShows.addNode({
        id: item._id,
        slides: children._embedded.content.map((c) => c._id),
        ...item
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/:path',
      component: './src/templates/SlideShow.vue'
    })
  })
}
