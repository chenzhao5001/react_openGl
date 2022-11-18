import OpenGlView from './view/OpenGlView'

const index = 1
function App() {
  return (
    <>
      {index === 1 ? <OpenGlView />:''}
      {index === 2 ? <OpenGlView />:''}
    </>
  );
}

export default App;
