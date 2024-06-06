import {Outlet} from 'react-router-dom'
import BlogStoreProvider from './components/store/store'

function App() {
  return (
    <BlogStoreProvider>
      <Outlet />
    </BlogStoreProvider>
  )
}

export default App
