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
      sea: '',
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

      scene.add(hemisphereLight)
      scene.add(shadowLight)
      scene.add(ambientLight)
      var ch = new THREE.CameraHelper(shadowLight.shadow.camera)
      scene.add(ch)

      let airplane = new AirPlane()
      // airplane.mesh.scale.set(0.25, 0.25, 0.25)
      airplane.mesh.position.y = 100
      this.airplane = airplane
      this.scene.add(airplane.mesh)

      // var planeGeometry = new THREE.PlaneBufferGeometry(600, 600, 1, 1)
      // planeGeometry.rotateX(-Math.PI / 2)
      // var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
      // var plane = new THREE.Mesh(planeGeometry, planeMaterial)
      // plane.receiveShadow = true
      // plane.position.y = -30
      // plane.position.z = -50
      // this.plane = plane
      // scene.add(plane)

      // 海洋
      /* eslint-disable */
      let game = {
        seaRadius:600,
        seaLength:800,
        wavesMinAmp : 5,
        wavesMaxAmp : 20,
        wavesMinSpeed : 0.001,
        wavesMaxSpeed : 0.003,
      }
      var Colors = {
          red:0xf25346,
          white:0xd8d0d1,
          brown:0x59332e,
          brownDark:0x23190f,
          pink:0xF5986E,
          yellow:0xf4ce93,
          blue:0x68c3c0,

      };
      let Sea = function () {
        var geom = new THREE.CylinderGeometry(game.seaRadius,game.seaRadius,game.seaLength,40,10)
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))
        geom.mergeVertices()
        var l = geom.vertices.length

        this.waves = []

        for (var i=0;i<l;i++){
          var v = geom.vertices[i];
          //v.y = Math.random()*30;
          this.waves.push({y:v.y,
                          x:v.x,
                          z:v.z,
                          ang:Math.random()*Math.PI*2,
                          amp:game.wavesMinAmp + Math.random()*(game.wavesMaxAmp-game.wavesMinAmp),
                          speed:game.wavesMinSpeed + Math.random()*(game.wavesMaxSpeed - game.wavesMinSpeed)
                          });
        };
        var mat = new THREE.MeshPhongMaterial({
          color:Colors.blue,
          transparent:true,
          opacity:.8,
          shading:THREE.FlatShading,

        });

        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.name = "waves";
        this.mesh.receiveShadow = true;

      }

      Sea.prototype.moveWaves = function (){
        var verts = this.mesh.geometry.vertices;
        var l = verts.length;
        for (var i=0; i<l; i++){
          var v = verts[i];
          var vprops = this.waves[i];
          v.x =  vprops.x + Math.cos(vprops.ang)*vprops.amp;
          v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
          vprops.ang += vprops.speed*deltaTime;
          this.mesh.geometry.verticesNeedUpdate=true;
        }
      }
      let sea = new Sea();
      sea.mesh.position.y = -game.seaRadius;
      scene.add(sea.mesh);
      this.sea = sea
      /* eslint-enable */

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

      // 海面转动
      let sea = this.sea
      sea.mesh.rotation.z += game.speed * deltaTime     // *game.seaRotationSpeed;
      if (sea.mesh.rotation.z > 2*Math.PI)  {
        sea.mesh.rotation.z -= 2*Math.PI
      }

      ambientLight.intensity += (.5 - ambientLight.intensity)*deltaTime*0.005;

      coinsHolder.rotateCoins();
      ennemiesHolder.rotateEnnemies();

      sky.moveClouds();
      sea.moveWaves();

      // let plane = this.plane
      // plane.rotation.y += 0.01
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
