'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import Archive from '@/components/Archive';

export default function ArchivePage() {
  const router = useRouter();

  const openFolder = (folderId) => {
    router.push(`/archive/${folderId}`);
  };

  return (
    <Shell activeSection="archive" activeFolder={null}>
      <Archive onOpenFolder={openFolder} />
    </Shell>
  );
}
