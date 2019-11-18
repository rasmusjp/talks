<template>
  <Layout>
    <div v-for="item in slideshow.slides">
      {{ item.name }}
    </div>
  </Layout>
</template>

<page-query>
query {
  slideShows: allSlideshow {
    edges {
      node {
        name
        _url
        slides(sortBy: "_sortOrder", order: ASC) {
          name
          parentId
          backgroundImage {
            _url
          }
          backgroundImageFilter
          enterAnimation
          leaveAnimation
          showAllStepsAtTheSameTime
          steps {
            contentTypeAlias
            text
            size
          }
        }
      }
    }
  }
}
</page-query>

<script>
  export default {
    data() {
      return {
        slideshow: {}
      }
    },

    async mounted() {
      const { path } = this.$route.params

      this.slideshow = this.$page.slideShows.edges
        .map((e) => e.node)
        .find((s) => s._url === `/${path}/`)
    }
  }
</script>

<style></style>
