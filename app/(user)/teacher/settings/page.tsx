import { AccountSettings } from '@/components/shared/user/settings/AccountSettings';
import { PreferencesSettings } from '@/components/shared/user/settings/PreferencesSettings';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Settings() {
  return (
    <div className="px-10 pt-10">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Account</AccordionTrigger>
          <AccordionContent className="pl-4">
            <AccountSettings />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">Preferences</AccordionTrigger>
          <AccordionContent className="pl-4">
            <PreferencesSettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
