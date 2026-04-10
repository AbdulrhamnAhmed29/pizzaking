import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routes } from './routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

// سبينر بتصميم ذهبي ليناسب ستايلك
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050505]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4AF37]"></div>
  </div>
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route, index) => {
              if (route.redirect) {
                return <Route key={index} path={route.path} element={<Navigate to={route.redirect} replace />} />
              }

              // في حالة وجود أب (Layout) و أبناء (Children)
              if (route.children) {
                return (
                  <Route key={index} path={route.path} element={<route.element />}>
                    {route.children.map((child, childIndex) => (
                      <Route 
                        key={childIndex} 
                        path={child.path} 
                        element={<child.element />} 
                      />
                    ))}
                  </Route>
                )
              }

              // المسارات العادية (مثل Login)
              return <Route key={index} path={route.path} element={<route.element />} />
            })}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App