<template>
  <Layout>
    <h1>{{ $page.post.title }}</h1>
    <img :src="`http://localhost:1337${$page.post.imag}`">
    <p>{{ $page.post.description}}</p>
  </Layout>
</template>
<page-query>

query {
post(id: "2") {
id
title
description
imag
duration
}
}
</page-query>
<script>
export default {
  name: "Post.vue",
  metaInfo() {
    return this.$page.post.title
  }
}
</script>

<style scoped>

</style>
