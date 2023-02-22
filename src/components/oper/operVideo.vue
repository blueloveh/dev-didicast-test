<template>
    <div class="userVideo-container">
        <div class="userVideo-title">
            {{ title }}
        </div>
        <video class="userVideo-video"
        :src="video_url"
        crossorigin="anonymous"
        controls autoplay></video>
        <div class="userVideo-exit">
            <button class="userVideo-exit-button"
            @click="$router.go(-1)">
                강의 나가기
            </button>
            <div style="clear: both;"></div>
        </div>

    </div>
  </template>
  
  <script>
  
  export default {
    name: 'operVideo',
    data() {
      return {
        title: this.$route.query.title,
        video_url: this.$route.query.video_url,
      }
    },
    created() {
        console.log(this.video_url)
        console.log(this.lecture)
    },
    props: {
    },
    methods: {
      
    }
  }
  </script>
  
  <style>
  @import "@/css/userVideo.css";
  </style>
  