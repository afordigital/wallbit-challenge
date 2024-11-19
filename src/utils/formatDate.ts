export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Europe/Madrid'
  }).format(date)
}
