import { AbstractMesh, ArcRotateCamera, Color4, CubeTexture, Engine, HemisphericLight, KeyboardEventTypes, Mesh, MeshBuilder, PBRMaterial, RawTexture, Scene, SceneLoader, SolidParticle, SolidParticleSystem, StandardMaterial, Texture, TransformNode, Vector2, Vector3, Vector4 } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

export class City {

  camera: ArcRotateCamera;
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement){
    this.engine = new Engine(this.canvas, false);
    this.scene = this.CreateScene();
    this.camera = this.CreateCamera();

    this.CreateCity().then((mesh) => {
      const city = mesh.meshes[0]
      city.scaling = new Vector3(.5, .5, .5);
      const cities = [];
      let x = 0 
      let z = 0
      for(let i=0; i<4; i++) {
        cities[i] = city.clone("city" + [i], null);
        cities[i]!.position = new Vector3(x, 0, z);
        console.log(x, z)
        i === 0 ? x = 25 : null;
        i === 1 ? z = 25 : null;
        i === 2 ? x = 0 : null;
      }
      city.dispose()
    });

    this.PopUps();

    
    

    this.engine.runRenderLoop(() => {
      this.scene.render();
      //console.log(
      //  "beta", this.camera.beta,
      //  "alpha", this.camera.alpha,
      //  "radius", this.camera.radius
      //)
    });

  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    //scene.clearColor = new Color4(0, 0, 0, 0);
    //scene.debugLayer.show({
    //  embedMode: true,
    //});

    const light = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), scene);
    light.intensity = 0;

    //const ground = MeshBuilder.CreateGround("grnd", {width:100, height:100}, scene);
    //ground.position = new Vector3(12.5, 0 , 12.5);

    //const mat = this.CreateAsphalt();
    //ground.material = mat;

    const envTex = CubeTexture.CreateFromPrefilteredData("./textures/environment.env", scene);
    scene.environmentTexture = envTex;

    scene.createDefaultSkybox(envTex, true);

    return scene;
  }
  
  CreateCamera(): ArcRotateCamera {
    const camera = new ArcRotateCamera("camera", -1, 1.3, 70, new Vector3(12.5, 0, 12.5), this.scene);
    camera.attachControl();

    //camera.upperBetaLimit = Math.PI/2 - .1;
    camera.wheelPrecision = 2;

    return camera
  }

  async CreateCity() {
    const models = await SceneLoader.ImportMeshAsync("", "./models/", "city.glb");

    return models;
  }

  CreateAsphalt(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);

    pbr.environmentIntensity = .5;

    pbr.albedoTexture = new Texture("./textures/asphalt/asphalt_diffuse.jpg", this.scene);

    pbr.bumpTexture = new Texture("./textures/asphalt/asphalt_normal.jpg", this.scene);

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;

    pbr.metallicTexture = new Texture("./textures/asphalt/asphalt_ao_rough_metal.jpg", this.scene);

    pbr.roughness = 1;

    return pbr;
  }

  PopUps() {
    const plane = MeshBuilder.CreatePlane("p", {height: 15, width:15}, this.scene);

    const mat = new StandardMaterial("pMat", this.scene);
    mat.emissiveTexture = new Texture("./textures/Green.png", this.scene);
    mat.opacityTexture = new Texture("./textures/Green.png", this.scene);

    plane.material = mat;

    plane.billboardMode = 7;

    let a = 5
    let b = 5
    const popups: Array<Mesh> = []
    for(let i=0; i<4; i++) {
      popups[i] = plane.clone("popup" + [i], null);
      popups[i]!.position = new Vector3(a, 0, b);
      console.log(a, b)
      i === 0 ? a = 30 : null;
      i === 1 ? b = 30 : null;
      i === 2 ? a = 5 : null;
    }
    plane.dispose()

    let x = 0
    let y = 0
    const timer = setInterval(function() {
      popups.forEach(popup => {
        popup.scaling = new Vector3(x, x, x);
      })
      
      x += .01
      if (x > 1) {
        clearInterval(timer);
      }
    }, 100);

    const book = MeshBuilder.CreatePlane("b", {height: 15, width:15}, this.scene);
    const material = new StandardMaterial("bMat", this.scene);
    material.emissiveTexture = new Texture("./textures/Book.png", this.scene);
    material.opacityTexture = new Texture("./textures/Book.png", this.scene);

    book.material = material;

    book.billboardMode = 7;

    book.position = new Vector3(20, 0, 20);

    const time = setInterval(function() {
      
      book.scaling = new Vector3(y, y, y);
      
      y += .01
      if (y > 1) {
        clearInterval(time);
      }
    }, 100);
  }
}