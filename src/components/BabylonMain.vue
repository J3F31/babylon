<template>

  <div id="person">
    <img src="/images/PersonaEmpty.png" alt="Persona" class="persona">

    <div class="meter-persona"><div class="fill" id="personmood"></div></div>

    <img src="/images/sad.png" alt="sad" class="persona-sad" id="personsadface">
    <img src="/images/happy.png" alt="happy" class="persona-happy" id="personhappyface">

    <p class="employed" id="emplyed">Unemployed</p>
  </div> 

  <div id="dat">
    <img src="/images/DataEmpty.png" alt="Data" class="data">

    <div class="meter-data1"><div class="fill" id="peoplemood"></div></div>
    <div class="meter-data2"><div class="fill" id="peopleemployed"></div></div>

    <img src="/images/sad.png" alt="sad" class="data-sad" id="sad">
    <img src="/images/meh.png" alt="meh" class="data-meh1" id="meh1">

    <img src="/images/meh.png" alt="meh" class="data-meh2" id="meh2">
    <img src="/images/happy.png" alt="happy" class="data-happy" id="happy">

    <p class="clock" id="clock">DAY 0</p>
  </div>
  
  <canvas></canvas>
  <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=PT+Sans" />
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

    document.addEventListener("keydown", (event) => {
      switch(event.code) { 
        case "KeyQ": { 
          this.ExpandPersona();
          break; 
        } 
        case "KeyR": { 
          this.PersonEmployed();
          break; 
        } 
        case "KeyA": { 
          this.PersonMoodUp();
          break; 
        }
        case "KeyD": { 
          this.PersonHappy();
          break; 
        } 
        case "KeyS": { 
          this.PopulationMeters();
          break; 
        } 
        case "KeyF": { 
          this.PopulationFaces();
          break; 
        } 
        case "KeyE": { 
          this.DayCount();
          break; 
        }
        default: { 
          break; 
        } 
      }
      
    })
  },
  methods: {
    ExpandPersona() {
      const el = document.getElementById("person");
      el!.style.transform = "scale(1,1)";
    },
    PersonEmployed() {
      const emplyed = document.getElementById("emplyed");
      emplyed!.innerHTML = "Kitchen Porter";
    },
    PersonMoodUp() {
      const mood = document.getElementById("personmood");
      mood!.style.width = "70%";
    },
    PersonHappy() {
      const sadface = document.getElementById("personsadface");
      const happyface = document.getElementById("personhappyface");
      sadface!.style.opacity = "0";
      happyface!.style.opacity = "1";
    },
    PopulationMeters() {
      const mood = document.getElementById("peoplemood");
      const emplyd = document.getElementById("peopleemployed");
      mood!.style.width = "75%";
      emplyd!.style.width = "58%";
    },
    PopulationFaces() {
      const sad = document.getElementById("sad");
      const happy = document.getElementById("happy");
      const meh1 = document.getElementById("meh1");
      const meh2 = document.getElementById("meh2");
      sad!.style.opacity = "0";
      meh1!.style.opacity = "1";
      meh2!.style.opacity = "0";
      happy!.style.opacity = "1";
    },
    DayCount() {
      const day = document.getElementById("clock");
      let num = 0;
      const interval = setInterval(() => {
        day!.innerHTML = "Day " + num;
        num++
        if (num > 90) {
          clearInterval(interval);
        }
      }, 100)
    }

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

.employed {
  font-family: "PT Sans";
  position: absolute;
  left: 380px;
  top: 88px;
  color: white;
  font-size: 1.66rem;
}

.meter-persona,
.meter-data1,
.meter-data2 {
  position: absolute;
  background: white;
  height: 2rem;
  width: 15rem;
}

.meter-persona {
  top: 220px;
  left: 160px;
}

.fill {
  height: 100%;
  background: black;
  transition: width 4s ease-in-out;
}

#personmood {
  width: 35%;
}

.persona-sad,
.persona-happy {
  position: absolute;
  left: 450px;
  top: 180px;
  width: 5%;
  transition: opacity 1s ease;
}

.persona-happy {
  top: 188px;
}

.persona-happy,
.data-meh1,
.data-happy {
  opacity: 0;
}

.persona {
  width: 30%;
  position: absolute;
  left: 0%;
}

#person {
  transform: scale(0,0);
  transition: transform 1s ease-in-out;
  transform-origin: 0;
}

.clock {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 87%;
  top: 4%;
  font-family: 'Digital-7 Mono', sans-serif;
  color: white;
  font-size: 3rem;
}

.data {
  width: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 68%;
  top: 12%;
}

.data-meh1,
.data-sad {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 80%;
  top: 18%;
  width: 3%;
  transition: opacity 1s ease;
}

.data-happy,
.data-meh2 {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 80%;
  top: 12%;
  width: 3%;
  transition: opacity 1s ease;
}

.meter-data1 {
  top: 10%;
  left: 65%;
}

.meter-data2 {
  top: 16%;
  left: 65%;
}

#peoplemood {
  width: 57%;
}

#peopleemployed {
  width: 41%;
}
</style>
