import './App.css'
import { Route, Routes } from 'react-router-dom'
import About from './pages/AboutPage';
import Projects from './pages/ProjectsPage';
import Blog from './pages/BlogPage';
import Header from './components/Header';
import Footer from './components/Footer';
import WIPBanner from './components/WIPBanner';

function App() {
  return (
    <>
      <WIPBanner emoji="🚧" backgroundColor='#1f1f1f' fontColor='#fff' text='WIP React rewrite' /> 
      <Header />
      <Routes>
        <Route path='/' element={<About />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App