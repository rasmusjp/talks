<template>
  <Layout>
    <ul v-for="edge in $page.slideShows.edges" :key="edge.node.id">
      <li>
        <g-link :to="edge.node._url">{{ edge.node.name }}</g-link>
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query {
  slideShows: allSlideshow {
    edges {
      node {
        name
        _url
      }
    }
  }
}
</page-query>

<script>
  export default {
    metaInfo: {
      title: 'Hello, world!'
    }
  }
</script>

<style></style>
