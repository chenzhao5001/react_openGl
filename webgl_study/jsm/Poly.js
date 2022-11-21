const defAttr = () => ({
  gl:null,
  vertices:[],
  geoData:[],
  size:2,
  attrName:'a_Position',
  count:1,
  types:['POINTS'],
})

export default class Poly {
  gl=null
  vertices=[]
  geoData=[]
  size=2
  attrName='a_Position'
  count=0
  types=['POINTS']

  constructor(attr) {
    // Object.assign(this,defAttr(), attr)
    Object.assign(this, attr)
    this.init()
  }
  init() {
    // const {attrName,size,gl} = this;
    if(!this.gl) return;

    const verticesBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,verticesBuffer);
    this.updateBuffer(this.gl);

    const a_Position = this.gl.getAttribLocation(this.gl.program,'a_Position');
    this.gl.vertexAttribPointer(a_Position,this.size,this.gl.FLOAT,false,0,0);
    this.gl.enableVertexAttribArray(a_Position);
  }
  addVertice(...params) {
    this.vertices.push(...params)
    this.updateBuffer();
  }

  popVertice() {
    const len = this.vertices.length;
    this.vertices.splice(len-this.size,len)
    this.updateCount();
  }

  setVertice(ind,...params) {
    const i = ind * this.size;
    params.forEach((param,paramInd) => {
      this.vertices[i+ paramInd] = param
    })
  }

  updateBuffer() {
    this.updateCount();
    this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.vertices),this.gl.STATIC_DRAW);
  }

  updateCount() {
    this.count = this.vertices.length / this.size
  }

  updateVertices(params) {
    const vertices = [];
    this.geoData.forEach(data => {
      params.forEach(key => {
        vertices.push(data[key])
      })
    })

    this.vertices = vertices;
  }

  draw(types = this.types) {
    for(let type of types) {
      this.gl.drawArrays(this.gl[type],0,this.count);
    }
  }
}
