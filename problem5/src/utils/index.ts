function formatDateTime(timestamp: number) {
	const date = new Date(timestamp);

	// Extract day, month, year, hours, minutes, and seconds
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	// Format as dd/mm/yyyy hh:mm:ss
	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export { formatDateTime };
