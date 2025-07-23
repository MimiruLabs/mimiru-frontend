import { ChapterEditDashboard } from '@/features/Dashboard/ChapterEditDashboard';
import { PageProps } from '@/types';

type Props = PageProps & {
  params: Promise<{ chapterId: string }>
}

export default async function ChapterEditDashboardPage({ params }: Props) {
  const { chapterId } = await params;
  return <ChapterEditDashboard chapterId={chapterId} />;
}
