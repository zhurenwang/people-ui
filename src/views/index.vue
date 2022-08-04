<template>
  <div class="m-welcome" id="particles-js">
    <span class="m-banner">欢迎使用{{ title }}!</span>
  </div>
</template>

<script>
export default {
  components: {},
  name: "Welcome",
  data() {
    return {
      "title": "微宠筹后台管理系统"
    }
  },
  created() {

  },
  mounted() {
    this.initAndLoadData();
  },
  methods: {
    initAndLoadData() {
      /* default dom id (particles-js) */
      //particlesJS();

      /* config dom id */
      //particlesJS('dom-id');

      /* config dom id (optional) + config particles params */
      try {
        particlesJS('particles-js', {
          particles: {
            color: '#2A3F54',
            shape: 'circle', // "circle", "edge" or "triangle"
            opacity: 1,
            size: 4,
            size_random: true,
            nb: 150,
            line_linked: {
              enable_auto: true,
              distance: 100,
              color: '#64cd39',
              opacity: 1,
              width: 1,
              condensed_mode: {
                enable: false,
                rotateX: 600,
                rotateY: 600
              }
            },
            anim: {
              enable: true,
              speed: 1
            }
          },
          interactivity: {
            enable: true,
            mouse: {
              distance: 300
            },
            detect_on: 'canvas', // "canvas" or "window"
            mode: 'grab',
            line_linked: {
              opacity: .5
            },
            events: {
              onclick: {
                enable: true,
                mode: 'push', // "push" or "remove"
                nb: 4
              }
            }
          },
          /* Retina Display Support */
          retina_detect: true
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>
.m-welcome {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /*background-color: #2A3F54;*/
  position: relative;
  /*background-color: #b61924;*/
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

@keyframes welcome {
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}

 .m-banner {
  display: inline-block;
  position: absolute;
  top: 40%;
  left: 20%;
  color: #1abb9c;
  font-size: 50px;
  font-weight: 500;
  text-shadow: 5px 2px 6px #000;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  letter-spacing: 10px;
  /*
  -webkit-animation: welcome 10s linear 0.5s infinite normal;
  animation: welcome 10s linear 0.5s infinite normal;
  */
}
</style>
