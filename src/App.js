import './App.css';
import Plants from "./components/Plants.js"
import Header from "./components/header.js"
import Footer from "./components/footer.js"


function App() {
    return (
        <div className="App">
            <Header/>
            <Plants />
            <Footer/>
        </div>
    );
}

export default App;
