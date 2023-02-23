<template>
    <router-view/>
</template>

<script>
import { uuid } from 'vue-uuid';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      uuid: uuid.v4(),
      skill: '',
      skills: [{ skill: 'Vue.js' }, { skill: 'React' }]
    };
  },
}
</script>

<style>
@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);
#app {
  font-family: 'Noto Sans KR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

button:hover {
  filter: brightness(90%);
}

body {
  width: 100%;
}
</style>
