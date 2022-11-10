<template>
  <!--<button></button>-->

  <img src="/images/Persona.png" alt="Persona" class="persona">

  <img src="/images/Data.png" alt="Data" class="data">
  <canvas></canvas>
</template>

<script lang="ts">
//import { MainScene } from '@/babylon/MainScene';
import { City } from '@/babylon/City';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BabylonMain',
  mounted() {
    const canvas = document.querySelector("canvas")!;
    //const button = document.querySelector("button")!;
    //new MainScene(canvas, button);
    new City(canvas);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  width: 100%;
  height: 100%;
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */
}
.data {
  width: 55%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 68%;
  top: 12%;
}

.persona {
  width: 35%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 20%;
  top: 18%;
}

/*button {
  position: absolute;
  width: 100px;
  height: 40px;
  border: whitesmoke solid 2px;
  background-color: #333;
}
button:hover {
  background-color: whitesmoke;
}
button:active {
  background-color: rgb(243, 149, 180)
}
button:disabled {
  opacity: .5;
}*/
</style>
