import { ArcRotateCamera, Color4, Engine, KeyboardEventTypes, MeshBuilder, RawTexture, Scene, SolidParticle, SolidParticleSystem, StandardMaterial, Texture, Vector2, Vector3, Vector4 } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

export class MainScene {

  camera: ArcRotateCamera;
  scene: Scene;
  engine: Engine;

  center: Vector3 = new Vector3(0, 1, 0);
  faces: Array<Vector2> = [
    new Vector2(0, 0),
    new Vector2(Math.PI/2, 0),
    new Vector2(Math.PI/2, Math.PI/2),
    new Vector2(Math.PI/2, -Math.PI/2),
    new Vector2(Math.PI/2, -Math.PI),
    new Vector2(Math.PI, 0)
  ];

  constructor(private canvas: HTMLCanvasElement, private button: HTMLButtonElement){
    this.engine = new Engine(this.canvas, false);
    this.scene = this.CreateScene(this.button);
    this.camera = this.CreateCamera();
    

    this.engine.runRenderLoop(() => {
      this.scene.render();
      //console.log(
      //  "beta", this.camera.beta,
      //  "alpha", this.camera.alpha,
      //  "radius", this.camera.radius
      //)
    });

  }

  CreateScene(button: HTMLButtonElement): Scene {
    const scene = new Scene(this.engine);
    scene.clearColor = new Color4(0, 0, 0, 0);
    scene.debugLayer.show({
      embedMode: true,
    });

    const texture = new RawTexture(
      new Uint8Array([
        255, 154, 162, 255, 154, 162, 255, 154, 162, 255, 183, 178, 255, 183, 178, 255, 183, 178, 255, 218, 193, 255, 218, 193, 255, 218, 193, 226, 240, 203, 226, 240, 203, 226, 240, 203, 181, 234, 215, 181, 234, 215, 181, 234, 215, 199, 206, 234, 199, 206, 234, 199, 206, 234,
        255, 154, 162, 255, 154, 162, 255, 154, 162, 255, 183, 178, 255, 183, 178, 255, 183, 178, 255, 218, 193, 255, 218, 193, 255, 218, 193, 226, 240, 203, 226, 240, 203, 226, 240, 203, 181, 234, 215, 181, 234, 215, 181, 234, 215, 199, 206, 234, 199, 206, 234, 199, 206, 234,     
        255, 154, 162, 255, 154, 162, 255, 154, 162, 255, 183, 178, 255, 183, 178, 255, 183, 178, 255, 218, 193, 255, 218, 193, 255, 218, 193, 226, 240, 203, 226, 240, 203, 226, 240, 203, 181, 234, 215, 181, 234, 215, 181, 234, 215, 199, 206, 234, 199, 206, 234, 199, 206, 234 
      ]),
      18,
      3,
      Engine.TEXTUREFORMAT_RGB,
      this.scene,
      false,
      false,
      Texture.TRILINEAR_SAMPLINGMODE,
    )

    const cubeMat = new StandardMaterial("cubeMat", scene);
    cubeMat.emissiveTexture = texture;

    const faceUV = new Array(6);
    faceUV[0] = new Vector4(1/18, 1/3, 2/18, 2/3);
    faceUV[1] = new Vector4(4/18, 1/3, 5/18, 2/3);
    faceUV[2] = new Vector4(7/18, 1/3, 8/18, 2/3);
    faceUV[3] = new Vector4(10/18, 1/3, 11/18, 2/3);
    faceUV[4] = new Vector4(13/18, 1/3, 14/18, 2/3);
    faceUV[5] = new Vector4(16/18, 1/3, 17/18, 2/3);
    const options = {
      size: 1,
      faceUV: faceUV
    };

    const mainSquare = MeshBuilder.CreateBox("box", options, this.scene);
    mainSquare.position = this.center;
    mainSquare.material = cubeMat;

    //const light = new HemisphericLight("hemiLight", new Vector3(0, 10, 0), scene);
    //light.intensity = .5;

    const SPS = new SolidParticleSystem("sps", scene);
    SPS.addShape(mainSquare, 100);
    const spsMesh = SPS.buildMesh();
    spsMesh.material = cubeMat;
    mainSquare.dispose();

    const posArray = this.CalculatePositionsArray(SPS.particles, 10);

    SPS.initParticles = () => {
      SPS.particles.forEach((particle) => {
        particle.position = posArray[particle.id]
        particle.rotation = new Vector3(0, 0, 0)
      })
    };

    SPS.updateParticle = function(particle): SolidParticle {
      RotateParticle(particle)
      return particle;
    }

    const targetRotation = { x: 0, z: 0 }
    let enableRotation = false
    const RotateParticle = (particle: SolidParticle) => {
      if (!enableRotation) return
      const lerpTime = 5;
      let elapsedTime = 0;
      const timer = setInterval(async() => {
        particle.rotation.x = this.Lerp(particle.rotation.x, targetRotation.x, elapsedTime/lerpTime)
        particle.rotation.z = this.Lerp(particle.rotation.z, targetRotation.z, elapsedTime/lerpTime)
        elapsedTime = elapsedTime + .01
        //elapsedTime = Math.round(elapsedTime * 100) / 100
        if (elapsedTime > lerpTime) {
          particle.rotation.x = targetRotation.x
          particle.rotation.z = targetRotation.z
          button.disabled = false
          clearInterval(timer);
        }
      }, 10);
      if (particle === SPS.particles[SPS.nbParticles - 1]) enableRotation = false
    }
  
    

    SPS.initParticles();
    SPS.setParticles();

    scene.registerBeforeRender(function() {
      SPS.setParticles();
    });

    //scene.onKeyboardObservable.add((kbInfo) => {
    //  switch (kbInfo.type) {
    //    case KeyboardEventTypes.KEYDOWN:
    //      console.log("KEY DOWN: ", kbInfo.event.key);
    //      if (kbInfo.event.key === "k"){}
    //      break;
    //    case KeyboardEventTypes.KEYUP:
    //      console.log("KEY UP: ", kbInfo.event.code);
    //      break;
    //  }
    //});

    button.addEventListener("click", function(){
      targetRotation.x == 0? targetRotation.x = Math.PI/2 : targetRotation.x = 0
      targetRotation.z == 0? targetRotation.z = -Math.PI/2 : targetRotation.z = 0
      enableRotation = true
      button.disabled = true
    })

    return scene;
  }
  
  CreateCamera(): ArcRotateCamera {
    const camera = new ArcRotateCamera("camera", -Math.PI/2, Math.PI/2, 10, this.center, this.scene);
    camera.attachControl();

    return camera
  }

  CalculatePositionsArray(spsArray: Array<SolidParticle>, maxX: number): Array<Vector3> {
    let x = 0, y = 0
    const spacing = 1
    const z = 0
    
    const posArray = []

    for (let k = 0; k <= spsArray.length; k++) {
      const vec = new Vector3(x, y, z)
      x += spacing
      if (x == (maxX) * spacing) {
        y += spacing
        x = 0
      }
      posArray.push(vec)
    }

    return posArray;
  }

  Lerp(a: number, b: number, t: number): number {
    const lerp = a + (b - a) * t;
    return lerp;
  }

  Distance(a: number, b: number): number {
    const dist = Math.abs(a - b) / (a * a + b * b);
    return dist;
  }

  Delay(time: number): Promise<void> {
    const ms = time * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}