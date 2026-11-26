import { Providers } from '@/app/providers'
import { MainLayout } from '@/layouts/MainLayout'
import { ProductDetailsPage } from '@/pages/ProductDetailsPage'

function App() {
  return (
    <Providers>
      <MainLayout>
        <ProductDetailsPage />
      </MainLayout>
    </Providers>
  )
}

export default App
