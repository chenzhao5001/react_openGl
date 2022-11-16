import React from "react";
import * as THREE from 'three'
//轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import './wrap.css'
class OpenGlView extends React.Component {
  dom = null;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,1,2000);
  renderer = new THREE.WebGLRenderer();
  controls = new OrbitControls( this.camera, this.renderer.domElement );
  axesHelper = new THREE.AxesHelper( 5 );
  animate = () => {
    // 请求动画帧函数
    requestAnimationFrame( this.animate );
    this.renderer.render( this.scene, this.camera );
  }


  componentDidMount() {
    this.scene.add( this.axesHelper );

    this.camera.position.set(0,0,10);
    const geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
    const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube1 = new THREE.Mesh( geometry1, material1 );
    this.scene.add( cube1 );

    const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
    const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube2 = new THREE.Mesh( geometry2, material2 );
    cube2.position.x = 2;
    cube2.scale.x = 2;
    cube2.rotation = {x:1,y:1,z:1}
    // cube2.applyEuler(1,0,0);

    this.scene.add( cube2 );


    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.render( this.scene, this.camera );
    this.dom.appendChild( this.renderer.domElement);
    this.animate();
  }

  render() {
    return <div ref= {ref => this.dom = ref}  className={'wrap'} />
  }
}

export default OpenGlView
