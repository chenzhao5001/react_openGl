import React from "react"

import * as THREE from 'three'
import gsap from 'gsap'

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
  clock = new THREE.Clock()

  constructor(props) {
    super(props);

    // 窗口自适应
    window.addEventListener("resize",() => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth,window.innerHeight);
      // 自适应屏幕像素比
      this.renderer.setPixelRatio(window.devicePixelRatio);
    })

    // 全屏控制
    window.addEventListener("dblclick",() => {
      if(document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        this.renderer.domElement.requestFullscreen();
      }

      // this.renderer.domElement.requestFullscreen();
    })
  }

  animate = () => {
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
    gsap.to(cube1.position,{x:5,y:5,duration:5})
    gsap.to(cube1.rotation,{x:2*Math.PI,duration:5})

    const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
    const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube2 = new THREE.Mesh( geometry2, material2 );
    cube2.position.x = 2;
    cube2.scale.x = 2;
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

export default OpenGlView;
