import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { GettingStartedPage } from '@/pages/GettingStartedPage';
import { IntroductionPage } from '@/pages/getting-started/IntroductionPage';
import { JavaScriptPage } from '@/pages/getting-started/JavaScriptPage';
import { ComponentsPage } from '@/pages/ComponentsPage';
import { ComponentDetailPage } from '@/pages/ComponentDetailPage';
import { IconsPage } from '@/pages/IconsPage';
import { BrandPage } from '@/pages/BrandPage';
import { BrandIllustrationsPage } from '@/pages/brand/IllustrationsPage';
import { BrandLogoPage } from '@/pages/brand/LogoPage';
import { BrandTypographyPage } from '@/pages/brand/TypographyPage';
import { BrandColorPage } from '@/pages/brand/ColorPage';
import { TokensPage } from '@/pages/TokensPage';
import { TokenColorPage } from '@/pages/tokens/ColorPage';
import { TokenTypographyPage } from '@/pages/tokens/TypographyPage';
import { TokenSpacingPage } from '@/pages/tokens/SpacingPage';
import { TokenShadowsPage } from '@/pages/tokens/ShadowsPage';
import { TokenRadiusPage } from '@/pages/tokens/RadiusPage';
import { AccessibilityOverviewPage } from '@/pages/accessibility/OverviewPage';
import { LiveAnnouncerPage } from '@/pages/accessibility/LiveAnnouncerPage';
import { PortalContainerPage } from '@/pages/accessibility/PortalContainerPage';
import { ScreenReaderPage } from '@/pages/accessibility/ScreenReaderPage';
import { ThemeProviderPage } from '@/pages/accessibility/ThemeProviderPage';
import { ContentDesignPage } from '@/pages/accessibility/ContentDesignPage';
import { PatternsOverviewPage } from '@/pages/patterns/OverviewPage';
import { UnifiedPlatformPage } from '@/pages/patterns/UnifiedPlatformPage';
import { FormsPage } from '@/pages/patterns/FormsPage';
import { EmptyStatesPage } from '@/pages/patterns/EmptyStatesPage';
import { DisabledStatesPage } from '@/pages/patterns/DisabledStatesPage';
import { ProPlanPage } from '@/pages/patterns/ProPlanPage';
import { ContributingPage } from '@/pages/ContributingPage';
import { StylingPage } from '@/pages/contributing/StylingPage';
import { PublishingPage } from '@/pages/contributing/PublishingPage';
import { NavigationHistoryProvider } from '@/context/NavigationHistoryContext';
import { StickyFilterProvider } from '@/context/StickyFilterContext';
import { SearchPage } from '@/pages/SearchPage';


function App() {
  return (
    <BrowserRouter>
      <NavigationHistoryProvider>
        <StickyFilterProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/getting-started" element={<GettingStartedPage />} />
              <Route path="/getting-started/introduction" element={<IntroductionPage />} />
              <Route path="/getting-started/javascript" element={<JavaScriptPage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route path="/components/:componentId" element={<ComponentDetailPage />} />
              <Route path="/icons" element={<IconsPage />} />
              <Route path="/brand" element={<BrandPage />} />
              <Route path="/brand/illustrations" element={<BrandIllustrationsPage />} />
              <Route path="/brand/logo" element={<BrandLogoPage />} />
              <Route path="/brand/typography" element={<BrandTypographyPage />} />
              <Route path="/brand/color" element={<BrandColorPage />} />
              <Route path="/tokens" element={<TokensPage />} />
              <Route path="/tokens/color" element={<TokenColorPage />} />
              <Route path="/tokens/typography" element={<TokenTypographyPage />} />
              <Route path="/tokens/spacing" element={<TokenSpacingPage />} />
              <Route path="/tokens/shadows" element={<TokenShadowsPage />} />
              <Route path="/tokens/radius" element={<TokenRadiusPage />} />
              <Route path="/accessibility" element={<AccessibilityOverviewPage />} />
              <Route path="/accessibility/live-announcer" element={<LiveAnnouncerPage />} />
              <Route path="/accessibility/portal-container" element={<PortalContainerPage />} />
              <Route path="/accessibility/screen-reader" element={<ScreenReaderPage />} />
              <Route path="/accessibility/theme-provider" element={<ThemeProviderPage />} />
              <Route path="/accessibility/content-design" element={<ContentDesignPage />} />
              <Route path="/patterns" element={<PatternsOverviewPage />} />
              <Route path="/patterns/unified-platform" element={<UnifiedPlatformPage />} />
              <Route path="/patterns/forms" element={<FormsPage />} />
              <Route path="/patterns/empty-states" element={<EmptyStatesPage />} />
              <Route path="/patterns/disabled-states" element={<DisabledStatesPage />} />
              <Route path="/patterns/pro-plan" element={<ProPlanPage />} />
              <Route path="/contributing" element={<ContributingPage />} />
              <Route path="/contributing/styling" element={<StylingPage />} />
              <Route path="/contributing/publishing" element={<PublishingPage />} />
            </Routes>
          </Layout>
        </StickyFilterProvider>
      </NavigationHistoryProvider>
    </BrowserRouter>
  );
}

export default App;
