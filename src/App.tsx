import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import Header from './components/Header';
import Footer from './components/Footer';
import PostPage from './pages/BlogPostPage';
import ProjectPage from './pages/ProjectPage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route index element={<AboutPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App