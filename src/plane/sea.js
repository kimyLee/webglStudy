// 海洋对象
let THREE = window.THREE
export default class Sea {
  constructor () {
    let params = {
      seaRadius: 600,
      seaLength: 800
    }
    // radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength
    var geom = new THREE.CylinderGeometry(params.seaRadius, params.seaRadius, params.seaLength, 40, 10)
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))
    geom.mergeVertices();
    var l = geom.vertices.length;
  
    this.waves = [];
  
    for (var i=0;i<l;i++){
      var v = geom.vertices[i];
      // v.y = Math.random()*30;
      this.waves.push({y:v.y,
                       x:v.x,
                       z:v.z,
                       ang:Math.random()* Math.PI * 2,
                       amp:game.wavesMinAmp + Math.random() * (game.wavesMaxAmp-game.wavesMinAmp),
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
}
