const defAttr = () => ({
  gl:null,
  vertices:[],
  geoData:[],
  size:2,
  attrName:'a_Position',
  count:0,
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
    const {attrName,size,gl} = this;
    if(!gl) return;

    const verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,verticesBuffer);
    this.updateBuffer(gl);

    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,size,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);
    // gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);


  }
  addVertice(...params) {
    this.vertices.push(...params)
    this.updateBuffer();
  }

  popVertice() {
    const [vertices,size] = this;
    const len = vertices.length;
    vertices.splice(len-size,len)
    this.updateCount();
  }

  setVertice(ind,...params) {
    const [vertices,size] = this;
    const i = ind*size;
    params.forEach((param,paramInd) => {
      vertices[i+ paramInd] = param
    })
  }

  updateBuffer() {
    const {gl,vertices} = this;
    this.updateCount();
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
  }

  updateCount() {
    this.count = this.vertices.length / this.size
  }

  updateVertices(params) {
    const {geoData} = this;
    const vertices = [];
    geoData.forEach(data => {
      params.forEach(key => {
        vertices.push(data[key])
      })
    })

    this.vertices = vertices;
  }

  draw(types = this.types) {
    const [gl,count] = this;
    for(let type of types) {
      gl.drawArrays(gl[types],0,count);
    }
  }
}
