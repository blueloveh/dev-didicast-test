<template>
    <div class="userVideo-container">
        <div class="userVideo-title">
            {{ lecture.title }}
        </div>
        <video class="userVideo-video"
        :src="video_url" 
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
    name: 'userVideo',
    data() {
      return {
        video_url: this.$route.query.video_url,
        // router query push할 때, JSON 데이터를 유지하려면 stringfy와 parse 과정이 필요하다.
        lecture: JSON.parse(this.$route.query.lecture),
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
  