<template>
  <!--<img src="/images/Persona.png" alt="Persona" class="persona">-->
  <img src="/images/PersonaEmpty.png" alt="Persona" class="persona">
  <!--<img src="/images/Data.png" alt="Data" class="data">-->
  <img src="/images/DataEmpty.png" alt="Data" class="data">


  <img src="/images/sad.png" alt="sad" class="persona-sad">
  <img src="/images/happy.png" alt="happy" class="persona-happy">


  <img src="/images/sad.png" alt="sad" class="data-sad">
  <img src="/images/meh.png" alt="meh" class="data-meh1">
  
  <img src="/images/meh.png" alt="meh" class="data-meh2">
  <img src="/images/happy.png" alt="happy" class="data-happy">


  <p class="clock">DAY 16</p>
  <p class="employed">Unemployed</p>


  <div class="meter-persona"><div class="fill"></div></div>
  <div class="meter-data1"><div class="fill"></div></div>
  <div class="meter-data2"><div class="fill"></div></div>


  <canvas></canvas>
  <link href="https://fonts.cdnfonts.com/css/digital-7-mono" rel="stylesheet">
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

.clock {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 87%;
  top: 10%;
  font-family: 'Digital-7 Mono', sans-serif;
  color: white;
  font-size: 3rem;
}

.employed {
  font-family: "PT Sans";
  position: absolute;
  transform: translate(-50%, -50%);
  left: 28.5%;
  top: 13%;
  color: white;
  font-size: 1.7rem;
}

.meter-persona,
.meter-data1,
.meter-data2 {
  position: absolute;
  transform: translate(-50%, -50%);
  background: white;
  height: 2rem;
  width: 15rem;
}

.meter-persona {
  top: 28%;
  left: 20%;
}

.meter-data1 {
  top: 12%;
  left: 70%;
}

.meter-data2 {
  top: 18%;
  left: 70%;
}

.fill {
  width: 50%;
  height: 100%;
  background: black;
  transition: width 1s ease-in-out;
}

.fill:hover {
  width: 80%;
}

.data-happy,
.data-meh2 {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 78%;
  top: 12%;
  width: 3%;
  transition: opacity 1s ease;
}

.data-meh1,
.data-sad {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 78%;
  top: 18%;
  width: 3%;
  transition: opacity 1s ease;
}

.persona-sad,
.persona-happy {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 30%;
  top: 28%;
  width: 5%;
  transition: opacity 1s ease;
}

.persona-happy,
.data-meh1,
.data-happy {
  opacity: 0;
}

.persona-sad:hover,
.data-meh1:hover,
.data-sad:hover {
  opacity: 0;
}

.persona-happy:hover,
.data-happy:hover,
.data-meh1:hover {
  opacity: 1;
}

.data {
  width: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 68%;
  top: 12%;
}

.persona {
  width: 30%;
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
