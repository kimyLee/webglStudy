let THREE = window.THREE
export default class Fire {
  constructor ({x, y, z}) {
    this.beginPos = {x, y, z}
    this.maxDistance = 400
    this.disabled = false
    this.canNext = false

    // 创建对象 BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    let geom = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
    var geomMaterial = new THREE.MeshStandardMaterial({color: 0xffffff})
    let bullet = new THREE.Mesh(geom, geomMaterial)
    bullet.position.x = x
    bullet.position.y = y
    bullet.position.z = z
    // console.log('creat', bullet.position.x, bullet.position.y, bullet.position.z)
    bullet.castShadow = true
    this.bullet = bullet
  }
  updateFire () {
    this.bullet.position.x = this.bullet.position.x + 5
    // console.log(this.bullet.position.x)
    if (this.bullet.position.x - this.beginPos.x > this.maxDistance) {
      // console.log('loss')
      this.disabled = true
    }
    if (this.bullet.position.x - this.beginPos.x > 30) {
      this.canNext = true
    }
  }
}
