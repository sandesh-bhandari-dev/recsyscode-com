'use client';

import { useRouter, useParams } from 'next/navigation';
import Shell from '@/components/Shell';
import CourseView from '@/components/CourseView';

export default function FolderPage() {
  const router = useRouter();
  const { folderId } = useParams();

  return (
    <Shell activeSection="archive" activeFolder={folderId}>
      <CourseView folderId={folderId} onBack={() => router.push('/archive')} />
    </Shell>
  );
}
