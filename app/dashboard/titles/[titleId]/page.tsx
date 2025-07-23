import { TitleDetailDashboard } from '@/features/dashboard/titles';
import { PageProps } from '@/types';

type Props = PageProps & {
  params: Promise<{ titleId: string }>
}

export default async function TitleDetailDashboardPage({ params }: Props) {
  const { titleId } = await params;
  return <TitleDetailDashboard titleId={titleId} />;
}
