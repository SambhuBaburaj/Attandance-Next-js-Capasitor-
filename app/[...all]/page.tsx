import dynamic from 'next/dynamic';
import { lists } from '../../mock';

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
});

export async function generateStaticParams() {
  // Define the static paths explicitly
  return [
    { all: ['feed'] },
    { all: ['lists'] },
    ...lists.map(list => ({ all: ['lists', list.id] })), // Map dynamic list IDs
    { all: ['settings'] },
    { all: ['attendance'] },
    { all: ['temp'] },
    { all: ['home'] },
    { all: ['admin'] }, // Correct format for /admin/home

    { all: ['admin', 'home'] }, // Correct format for /admin/home
    { all: ['parents', 'home'] }, // Correct format for /parents/home
    { all: ['teacher', 'home'] }, // Correct format for /teacher/home
    { all: ['login'] },
    { all: ['admin', 'teacher-list'] },

  ];
}

export default function Page() {
  return <App />;
}
