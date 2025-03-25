import { TogglerTheme } from '../TogglerTheme';

export function PreferencesSettings() {
  return (
    <div>
      <div className="flex gap-2">
        <p>Theme</p>
        <TogglerTheme />
      </div>
    </div>
  );
}
