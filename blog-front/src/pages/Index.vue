<template>
  <Layout v-slot="{searchText}">
    <v-tabs v-model="tab" grow>
      <v-tab>All post</v-tab>
      <v-tab>Music</v-tab>
      <v-tab>Three</v-tab>
    </v-tabs>
    <v-row class="justify-lg-space-around">

      <v-card
          v-for="edge in getPost(searchText)" :key="edge.node.id"
          class="mx-auto mt-5"
          width="300"
      >
        <v-img
            class="white--text align-end"
            height="200px"
            :src="`http://localhost:1337${edge.node.imag}`"
        >
        </v-img>
        <v-card-title>{{ edge.node.title }}</v-card-title>

        <v-card-subtitle class="pb-0">
          {{ formatDate(edge.node.date) }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ edge.node.duration }}</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
              @click="$router.push(`/post/${edge.node.id}`)"
              color="orange"
              text
          >
            More Info
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </Layout>
</template>

<page-query>
query {
posts: allPost {
edges {
node {
id
title
date
duration
price
description
imag
categories
}
}
}
}
</page-query>
<script>
import moment from 'moment'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  data() {
    return {
      tab: 0,
      posts: []
    }
  },
  mounted() {
    this.posts = this.$page.posts.edges
  },
  watch: {
    tab(val) {
      if (this.tab === 0) {
        this.showAllEvents()
      } else {
        this.showEventsByType(val)
      }
    }
  },
  methods: {
    showAllEvents() {
      this.posts = this.$page.posts.edges
    },
    showEventsByType(val) {
      console.log(val)
      this.posts = this.$page.posts.edges.filter((edge) => {
        return edge.node.categories === val
      })

    },
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY, h:mm a')
    },
    getPost(searchText){
      return this.posts.filter((edge) => {
        return edge.node.title.toLowerCase().includes(searchText.toLowerCase())
    })

  }

}
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
