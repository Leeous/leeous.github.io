import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';

function App() {
  return (
    <>
      <Banner emoji="🚧" backgroundColor='#1f1f1f' fontColor='#fff'>
        <div>
        <h4>WIP</h4>
        <br/>
        <p>React Rewrite</p>
        </div>
      </Banner>
      <Header />
      <Routes>
        <Route path='/' element={<AboutPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blog' element={<BlogPage />} />
        {/* <Route path='/blog' element={<BlogPage />} /> */}
        <Route path='/projects' element={<ProjectsPage />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App