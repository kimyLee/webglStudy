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
      // renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

      // 创建几何体
      // Cube
      let geometry = new THREE.BoxGeometry(200, 100, 200)
      // for (let i = 0; i < geometry.faces.length; i += 2) {
      //   let hex = Math.random() * 0xffffff
      //   geometry.faces[i].color.setHex(hex)
      //   geometry.faces[i + 1].color.setHex(hex)
      // }
      new THREE.ImageLoader()
        .setCrossOrigin('*')
        .load('/static/img/cat.jpg?' + performance.now(), (image) => {
          var texture = new THREE.CanvasTexture(image)
          var material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
          let cube = new THREE.Mesh(geometry, material)
          cube.position.y = 150
          this.cube = cube
          scene.add(cube)
        })
      // let material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors })
      // let cube = new THREE.Mesh(geometry, material)
      // cube.position.y = 150
      // this.cube = cube
      // scene.add(cube)

      // Plane
      let geometryPlane = new THREE.PlaneBufferGeometry(200, 200)
      geometryPlane.rotateX(-Math.PI / 2)
      let materialPlane = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
      let plane = new THREE.Mesh(geometryPlane, materialPlane)
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
