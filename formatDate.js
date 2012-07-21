/**
 * Format a date using a formatting pattern string
 * Handlebars Template Helper Function
 *
 * @param date {String} Date string to be parsed into a Date object
 * @param format {Function} Compiled template of formatting pattern string with character flags (e.g. 'F j, Y')
 *
 * Based on PHP date formatting
 * @see <a href="http://php.net/manual/en/function.date.php">PHP Date format API</a>
 * @author Nathan Barr
 */
function(date, format) {
	var i, result = '', date = new Date(date), months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	format = format().trim();//retrieve the format string from the compiled Handlebars template
	for (i = 0; i < format.length; i++) {
		switch (format[i]) {
			case 'F': //A full textual representation of a month (January through December)
				result += months[date.getMonth()];
				break;
			case 'j': //Day of the month without leading zeros (1 to 31)
				result += date.getDate();
				break;
			case 'Y': //A full numeric representation of a year, 4 digits (e.g. 1999 or 2003)
				result += date.getFullYear();
				break;
			default: //Allow other characters to pass through (e.g. space, colon, etc.)
				result += format[i];
		}
	}
	return result;
};