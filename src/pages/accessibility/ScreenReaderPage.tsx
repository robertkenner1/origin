import { AccessibilityLayout } from '@/components/layout/AccessibilityLayout';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export function ScreenReaderPage() {
  return (
    <AccessibilityLayout>
      <PlaceholderPage title="Screen Reader Only" />
    </AccessibilityLayout>
  );
}
