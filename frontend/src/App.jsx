import './css/App.css'
import Home from './pages/Home'
import MealDetails from './pages/MealDetails'
import Meals from './pages/Meals'
import Planner from './pages/Planner'
import ShoppingList from './pages/ShoppingList'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import NewMeal from './pages/NewMeal'
import EditMeal from './pages/EditMeal'

function App() {
  return (
    <>
    <ScrollToTop />
    <Header />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/meals' element={<Meals />}/>
          <Route path='/meals/new' element={<NewMeal />}/>
          <Route path='/meal/:id' element={<MealDetails />}/>
          <Route path='/meal/:id/edit' element={<EditMeal />}/>
          <Route path='/planner' element={<Planner />}/>
          <Route path='/shopping-list' element={<ShoppingList />}/>
        </Routes>
      </main>
    <Footer />
    </>
  )
}

export default App;