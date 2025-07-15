import { TitleDetailDashboard } from '@/features/Dashboard/TitleDetailDashboard';

export default function TitleDetailDashboardPage({ params }: { params: { titleId: string } }) {
  return <TitleDetailDashboard titleId={params.titleId} />;
}
