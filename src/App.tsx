import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ComponentsPage } from '@/pages/ComponentsPage';
import { ComponentDetailPage } from '@/pages/ComponentDetailPage';
import { IconsPage } from '@/pages/IconsPage';
import { BrandPage } from '@/pages/BrandPage';
import { BrandIllustrationsPage } from '@/pages/brand/IllustrationsPage';
import { BrandLogoPage } from '@/pages/brand/LogoPage';
import { BrandTypographyPage } from '@/pages/brand/TypographyPage';
import { BrandColorPage } from '@/pages/brand/ColorPage';
import { TokensPage } from '@/pages/TokensPage';
import { NavigationHistoryProvider } from '@/context/NavigationHistoryContext';
import { StickyFilterProvider } from '@/context/StickyFilterContext';

// Component to handle the components page with modal overlay
function ComponentsWithModal() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/components/') && location.pathname !== '/components';
  
  return (
    <>
      <ComponentsPage />
      {isDetailPage && <ComponentDetailPage />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavigationHistoryProvider>
        <StickyFilterProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/components" element={<ComponentsWithModal />} />
              <Route path="/components/:componentId" element={<ComponentsWithModal />} />
              <Route path="/icons" element={<IconsPage />} />
              <Route path="/brand" element={<BrandPage />} />
              <Route path="/brand/illustrations" element={<BrandIllustrationsPage />} />
              <Route path="/brand/logo" element={<BrandLogoPage />} />
              <Route path="/brand/typography" element={<BrandTypographyPage />} />
              <Route path="/brand/color" element={<BrandColorPage />} />
              <Route path="/tokens" element={<TokensPage />} />
            </Routes>
          </Layout>
        </StickyFilterProvider>
      </NavigationHistoryProvider>
    </BrowserRouter>
  );
}

export default App;
