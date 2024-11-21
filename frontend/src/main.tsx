import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import Todo from './pages/Todo.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <Provider store={store}>
   <Toaster position="top-right" richColors />
   <Todo />
  </Provider>
 </StrictMode>,
)
