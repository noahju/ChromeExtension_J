<template>
    <div id="mainpage">
    <div class="circular" v-bind:style="{ backgroundImage: 'url(' + image + ')' }"></div>
      {{ name }}
      <button id="btn" @click="getImage" >test </button>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    data() {
            return {
                name: 'administator',
                todoList: [],
                image : "https://d3cbihxaqsuq0s.cloudfront.net/images/74635267_xl.jpg"
            }
    },
    computed: {
        loading(){
            return this.name = 'admin'
        }
    },
    methods: {
      getImage(){
        this.name = 'name changed'
        this.image = 'https://d3cbihxaqsuq0s.cloudfront.net/images/12231334_xl.jpg'
      }

    }
    
}
</script>

