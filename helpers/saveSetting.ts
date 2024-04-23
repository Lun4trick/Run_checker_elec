export const saveSettings = (data: any) => {
  (window as any).api.send('saveData', data);
}