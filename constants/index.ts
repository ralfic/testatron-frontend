import { AlarmClock, AlarmClockOff, House, LayoutDashboard, LogOut, Settings } from 'lucide-react';

export const dashboardMenuPaths = [
  {
    title: 'Menu',
    paths: [
      { name: 'Dashboard', path: '/i/dashboard', icon: LayoutDashboard },
      { name: 'Ongoing test', path: '/i/ongoing-test', icon: AlarmClock },
      { name: 'Ended test', path: '/i/ended-test', icon: AlarmClockOff },
    ],
  },
  {
    title: 'Room',
    paths: [{ name: 'Join test', path: '/i/join-test', icon: House }],
  },
  {
    title: 'Others',
    paths: [
      { name: 'Settings', path: '/i/settings' , icon: Settings},
      { name: 'Logout', path: '/i/logout' , icon: LogOut },
    ],
  },
];
