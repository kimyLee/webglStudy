<template>
  <div class="three">
    
  </div>
</template>

<script>
let THREE = window.THREE
export default {
  name: 'three',
  data () {
    return {
      renderer: '',
      scene: '',
      camera: '',
      // obj
      stats: '',
      plane: '',
      cube: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      /* eslint-disable */
      let scene = new THREE.Scene()
      this.scene = scene
      scene.background = new THREE.Color(0xf0f0f0)

      let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
      this.camera = camera
      camera.position.y = 20
      camera.position.z = 20
      camera.position.x = 20
      camera.lookAt(new THREE.Vector3(0, 0, 0))

      var renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
     renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

//Create a DirectionalLight and turn on shadows for the light
var light = new THREE.DirectionalLight( 0xffffff, 1, 10 );
light.position.set( 0, 1, 1 ); 			//default; light shining from top
light.castShadow = true;            // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;    // default
light.shadow.camera.far = 500;     // default

//Create a sphere that cast shadows (but does not receive them)
var sphereGeometry = new THREE.SphereBufferGeometry( 2, 32, 32 );
var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );

//Create a plane that receives shadows (but does not cast them)
var planeGeometry = new THREE.PlaneBufferGeometry( 70, 70, 1, 1 );
planeGeometry.rotateX(-Math.PI / 2)
var planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.z = -50
plane.position.y = -30

plane.receiveShadow = true;
scene.add( plane );

//Create a helper for the shadow camera (optional)
var helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );
renderer.render(scene, camera)

 /* —————————————————————————————————————————— */
      // let scene = new THREE.Scene()
      // this.scene = scene
      // scene.background = new THREE.Color(0xf0f0f0)
      // // 可视范围度数  平面比 近平面 远平面
      // let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
      // this.camera = camera
      // camera.position.y = 150
      // camera.position.z = 500
      // camera.lookAt(new THREE.Vector3(0, 0, 0))

      // let renderer = new THREE.WebGLRenderer({ antialias: true })
      // this.renderer = renderer
      // // renderer.setPixelRatio(window.devicePixelRatio)
      // renderer.setSize(window.innerWidth, window.innerHeight)
      // document.body.appendChild(renderer.domElement)

      // // 创建几何体
      // // Cube
      // let geometry = new THREE.BoxGeometry(200, 100, 200)
      // // for (let i = 0; i < geometry.faces.length; i += 2) {
      // //   let hex = Math.random() * 0xffffff
      // //   geometry.faces[i].color.setHex(hex)
      // //   geometry.faces[i + 1].color.setHex(hex)
      // // }
      // new THREE.ImageLoader()
      //   .setCrossOrigin('*')
      //   .load('/static/img/cat.jpg?' + performance.now(), (image) => {
      //     var texture = new THREE.CanvasTexture(image)
      //     var material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
      //     let cube = new THREE.Mesh(geometry, material)
      //     cube.position.y = 150
      //     this.cube = cube
      //     scene.add(cube)
      //   })
      // // let material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors })
      // // let cube = new THREE.Mesh(geometry, material)
      // // cube.position.y = 150
      // // this.cube = cube
      // // scene.add(cube)

      // // Plane
      // let geometryPlane = new THREE.PlaneBufferGeometry(200, 200)
      // geometryPlane.rotateX(-Math.PI / 2)
      // let materialPlane = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
      // let plane = new THREE.Mesh(geometryPlane, materialPlane)
      // this.plane = plane
      // scene.add(plane)

      // let Stats = window.Stats
      // let stats = new Stats()
      // this.stats = stats
      // document.body.appendChild(stats.dom)

      // // gui
      // let dat = window.dat
      // let gui = new dat.GUI()
      // let cameraControl = gui.add({
      //   cameraHeight: 150
      // }, 'cameraHeight', -100, 500)
      // cameraControl.onChange((val) => {
      //   this.camera.position.y = val
      // })

      // let cameraFar = gui.add({
      //   cameraFar: 500
      // }, 'cameraFar', 400, 820)
      // cameraFar.onChange((val) => {
      //   this.camera.position.z = val
      // })

      // this.render()
    })
  },
  methods: {
    render () {
      requestAnimationFrame(this.render)
      this.stats.begin()
      let renderer = this.renderer
      let scene = this.scene
      let camera = this.camera
      let cube = this.cube
      let plane = this.plane
      plane.rotation.y += 0.01
      if (cube) {
        cube.rotation.y += 0.01
      }
      renderer.render(scene, camera)
      this.stats.end()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
