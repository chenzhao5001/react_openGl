import React from "react";
import * as THREE from 'three'
import './wrap.css'
class OpenGlView extends React.Component {
  dom = null;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,1,2000);
  renderer = new THREE.WebGLRenderer();


  animate = () => {
    // console.log(this.animate,"animate!!!!")
    requestAnimationFrame( this.animate );
    this.renderer.render( this.scene, this.camera );
  }


  componentDidMount() {
    this.camera.position.set(0,0,10);
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
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
