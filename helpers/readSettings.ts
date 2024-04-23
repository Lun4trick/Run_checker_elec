export const readSettings = () => {
  (window as any).api.send('readData');
}