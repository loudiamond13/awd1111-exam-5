import{BrowserRouter as Router,Route,Routes} from "react-router-dom";

import Layout from "./layouts/Layout";
import PageOne from "./pages/PageOne";
import PageThree from "./pages/PageThree";
import PageTwo from "./pages/PageTwo";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><PageOne/></Layout>}/>
        <Route path="/page2" element={<Layout><PageTwo/></Layout>}/>
        <Route path='/page3' element={<Layout><PageThree/></Layout>}/>
      </Routes>
    </Router>
  )
}

export default App;
