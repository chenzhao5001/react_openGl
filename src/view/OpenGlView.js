import React from "react";
import * as THREE from 'three'
import './wrap.css'
class OpenGlView extends React.Component {
  dom = null;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,1,2000);
  componentDidMount() {
    console.log(THREE,"three")

    this.camera.position.set(0,0,10);
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
    const renderer = new THREE.WebGLRenderer();
    renderer.render(this.scene,this.camera)
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.dom.appendChild( renderer.domElement);
  }

  render() {
    return <div ref= {ref => this.dom = ref}  className={'wrap'} />
  }
}

export default OpenGlView
