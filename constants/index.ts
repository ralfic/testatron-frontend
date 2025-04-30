import { UserRole } from '@/types';
import {
  AlarmClock,
  AlarmClockOff,
  LayoutDashboard,
  Settings,
} from 'lucide-react';

export function dashboardNav(role: UserRole) {
  return role === UserRole.TEACHER
    ? [
        {
          title: 'Menu',
          paths: [
            {
              name: 'Dashboard',
              path: `/teacher/dashboard`,
              icon: LayoutDashboard,
            },
            {
              name: 'Ongoing tests',
              path: `/teacher/ongoing-tests`,
              icon: AlarmClock,
            },
            {
              name: 'Ended tests',
              path: `/teacher/ended-tests`,
              icon: AlarmClockOff,
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
