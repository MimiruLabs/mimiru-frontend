import { ChapterEditDashboard } from '@/features/Dashboard/ChapterEditDashboard';

export default function ChapterEditDashboardPage({ params }: { params: { chapterId: string } }) {
  return <ChapterEditDashboard chapterId={params.chapterId} />;
}
