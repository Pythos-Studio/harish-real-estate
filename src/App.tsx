import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";

const KEY = "hre-preloaded";

export default function App() {
  const [loading, setLoading] = useState(() => {
    try { return !sessionStorage.getItem(KEY); } catch { return true; }
  });
  const done = useCallback(() => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setLoading(false);
  }, []);

  return (
    <div className="grain">
      <AnimatePresence>{loading && <Preloader key="pre" onDone={done} />}</AnimatePresence>
      <Home ready={!loading} />
    </div>
  );
}
