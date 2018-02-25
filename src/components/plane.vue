<template>
  <div class="three">
    
  </div>
</template>

<script>
import AirPlane from '@/plane/hero'
import Fire from '@/plane/fire'
let THREE = window.THREE

export default {
  name: 'three',
  data () {
    return {
      loaded: false,    // 测试是否加载
      renderer: '',
      scene: '',
      camera: '',
      // obj
      stats: '',
      plane: '',
      cube: '',
      airplane: '',
      fires: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      let scene = new THREE.Scene()
      this.scene = scene
      scene.background = new THREE.Color(0xf0f0f0)
      // 可视范围度数  平面比 近平面 远平面
      let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
      this.camera = camera
      camera.position.y = 150
      camera.position.z = 500
      camera.lookAt(new THREE.Vector3(0, 0, 0))

      let renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer = renderer
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      // renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

      // LIGHTS

      // var shadowLight
      var ambientLight, hemisphereLight, shadowLight
      // 半圆灯光
      hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

      // 所有的灯光
      ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)

      shadowLight = new THREE.DirectionalLight(0xffffff, 1, 1000)
      shadowLight.position.set(0, 500, 500)
      shadowLight.castShadow = true
      shadowLight.shadow.mapSize.width = 512
      shadowLight.shadow.mapSize.height = 512
      shadowLight.shadow.camera.near = 0.5
      shadowLight.shadow.camera.far = 1000
      shadowLight.shadow.camera.top = 300
      shadowLight.shadow.camera.left = 30
      shadowLight.shadow.camera.right = -30
      shadowLight.shadow.camera.bottom = -300

      // shadowLight.shadow.camera.left = -400
      // shadowLight.shadow.camera.right = 400
      // shadowLight.shadow.camera.top = 4000
      // shadowLight.shadow.camera.bottom = -400
      // shadowLight.shadow.camera.near = 1
      // shadowLight.shadow.camera.far = 1000
      // shadowLight.shadow.mapSize.width = 4096
      // shadowLight.shadow.mapSize.height = 4096

      scene.add(hemisphereLight)
      scene.add(shadowLight)
      scene.add(ambientLight)
      var ch = new THREE.CameraHelper(shadowLight.shadow.camera)
      scene.add(ch)
      // 创建几何体
      // Cube
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
      // let material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors })
      // let cube = new THREE.Mesh(geometry, material)
      // cube.position.y = 150
      // this.cube = cube
      // scene.add(cube)

      // Plane
      // let geometryPlane = new THREE.PlaneBufferGeometry(600, 600)
      // geometryPlane.rotateX(-Math.PI / 2)
      // let materialPlane = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
      // let plane = new THREE.Mesh(geometryPlane, materialPlane)
      // this.plane = plane
      // plane.receiveShadow = true
      // scene.add(plane)
      // hero
      let airplane = new AirPlane()
      // airplane.mesh.scale.set(0.25, 0.25, 0.25)
      airplane.mesh.position.y = 100
      this.airplane = airplane
      this.scene.add(airplane.mesh)

      // var sphereGeometry = new THREE.SphereBufferGeometry(10, 32, 32)
      // var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
      // var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      // sphere.castShadow = true
      // sphere.receiveShadow = false
      // sphere.position.x = 0
      // sphere.position.y = 20
      // sphere.position.z = 0
      // scene.add(sphere)

      // var planeGeometry = new THREE.PlaneBufferGeometry(600, 600, 1, 1)
      // planeGeometry.rotateX(-Math.PI / 2)
      // var planeMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00})
      // var plane = new THREE.Mesh(planeGeometry, planeMaterial)
      // plane.position.z = -50
      // plane.position.y = -30

      // plane.receiveShadow = true
      // this.plane = plane
      // scene.add(plane)

      var planeGeometry = new THREE.PlaneBufferGeometry(600, 600, 1, 1)
      planeGeometry.rotateX(-Math.PI / 2)
      var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
      var plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.receiveShadow = true
      plane.position.y = -30
      plane.position.z = -50
      this.plane = plane
      scene.add(plane)

      let Stats = window.Stats
      let stats = new Stats()
      this.stats = stats
      document.body.appendChild(stats.dom)

      // gui
      let dat = window.dat
      let gui = new dat.GUI()
      let cameraControl = gui.add({
        cameraHeight: 150
      }, 'cameraHeight', -100, 500)
      cameraControl.onChange((val) => {
        this.camera.position.y = val
      })

      let cameraHorizontal = gui.add({
        cameraHorizontal: 0
      }, 'cameraHorizontal', -300, 300)
      cameraHorizontal.onChange((val) => {
        this.camera.position.x = val
        this.camera.position.z = Math.round(Math.sqrt(500 * 500 - val * val))
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
        // this.camera.position.z = Math.round(300 - Math.abs(val))
      })

      let cameraFar = gui.add({
        cameraFar: 500
      }, 'cameraFar', 400, 820)
      cameraFar.onChange((val) => {
        this.camera.position.z = val
      })

      this.render()
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
      this.airplane.propeller.rotation.x += 0.2
      // 制造子弹
      // let fires = []
      // for (let i = 0; i < 10; i++) {
      if (this.fires.length < 2 && !this.loaded) {
        let fire = new Fire({x: this.airplane.mesh.position.x, y: this.airplane.mesh.position.y, z: this.airplane.mesh.position.z})
        this.scene.add(fire.bullet)
        this.fires.push(fire)
        this.loaded = true
      }
      for (let i = this.fires.length; i--;) {
        this.fires[i].updateFire()
        if (this.fires[i].disabled) {
          this.scene.remove(this.fires[i].bullet)
          this.fires.splice(i, 1)
        }
      }
      if (this.fires[this.fires.length - 1].canNext) {
        this.loaded = false
      }
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
