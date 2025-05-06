import { UserRole } from '@/types';
import { AlarmClock, LayoutDashboard, Settings } from 'lucide-react';

export function dashboardNav(role: UserRole) {
  return role === UserRole.TEACHER
    ? [
        {
          title: 'Menu',
          paths: [
            {
              name: 'My tests',
              path: `/teacher/test/my`,
              icon: LayoutDashboard,
            },
            {
              name: 'Test statistic',
              path: `/teacher/test/statistic`,
              icon: AlarmClock,
            },
          ],
        },

        {
          title: 'Others',
          paths: [
            { name: 'Settings', path: '/teacher/settings', icon: Settings },
          ],
        },
      ]
    : [
        {
          title: 'Menu',
          paths: [
            {
              name: 'Dashboard',
              path: `/student/dashboard`,
              icon: LayoutDashboard,
            },
            {
              name: 'Passed tests',
              path: `/student/passed-tests`,
              icon: AlarmClock,
            },
          ],
        },
        {
          title: 'Others',
          paths: [
            { name: 'Settings', path: '/student/settings', icon: Settings },
          ],
        },
      ];
}
