import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Visao } from './components/Visao'
import { Block01 } from './components/Block01'
import { Block02 } from './components/Block02'
import { Block03 } from './components/Block03'
import { Block04 } from './components/Block04'
import { Cronograma } from './components/Cronograma'
import { AplicacoesVisuais } from './components/AplicacoesVisuais'
import { Orcamentos } from './components/Orcamentos'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Visao />
        <Block01 />
        <Block02 />
        <Block03 />
        <Block04 />
        <Cronograma />
        <AplicacoesVisuais />
        <Orcamentos />
      </main>
    </>
  )
}

export default App
