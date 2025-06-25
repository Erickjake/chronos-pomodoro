import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Home from "../../pages/Home";
import About from "../../pages/About";
import NotFound from "../../pages/NotFound";
import { History } from "../../pages/History";
import { useEffect } from "react";
import Settings from "../../pages/Settings";


function ScrollToTop() {
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}


export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/History' element={<History />} />
        <Route path='/Settings' element={<Settings />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  )
}