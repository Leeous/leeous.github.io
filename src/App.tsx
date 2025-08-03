import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import Header from './components/Header';
import Footer from './components/Footer';
import PostPage from './pages/BlogPostPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<AboutPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App