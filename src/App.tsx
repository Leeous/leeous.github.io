import './App.scss'
import { Route, Routes, Outlet } from 'react-router-dom'
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import Header from './components/Header';
import Footer from './components/Footer';
import PostPage from './pages/BlogPostPage';
import ProjectPage from './pages/ProjectPage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './components/utils/ScrollToTop';
import ResumePage from './pages/ResumePage';

const CenteredLayout = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", flexShrink: 0, flexGrow: 1}}>
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route element={<CenteredLayout/>}>
          <Route index element={<AboutPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
        <Route path='/resume' element={<ResumePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App