import { getSettingsData } from "@/modules/settings/actions";
import SettingsPage from "@/modules/settings/components/settings-page";

export default async function SettingsPageWrapper() {
  const settingsData = await getSettingsData();

  return <SettingsPage initialData={settingsData.success ? settingsData.data : undefined} />;
}
