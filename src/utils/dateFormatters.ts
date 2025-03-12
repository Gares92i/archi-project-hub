
export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatShortDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", { 
    day: "numeric", 
    month: "short" 
  }).format(date);
};

export const isOverdue = (dateString: string | undefined) => {
  if (!dateString) return false;
  const dueDate = new Date(dateString);
  const now = new Date();
  return dueDate < now && !isToday(dueDate);
};

export const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};
