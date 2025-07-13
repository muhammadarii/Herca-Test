export function formattedDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formattedMonth(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}
