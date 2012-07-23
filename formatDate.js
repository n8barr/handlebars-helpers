define('formatDate', [], function() {
    /**
     * Format a date using a formatting pattern string
     * Handlebars Template Helper Function
     *
     * @param date {String} Date string to be parsed into a Date object
     * @param format {Function} Compiled template of formatting pattern string with character flags (e.g. 'F j, Y')
     *
     * Based on PHP date formatting
     * @link http://php.net/manual/en/function.date.php
     */
    return function(dateStr, format) {
        var i, result = '', date, months, pad, timezone, offset = 0;

        //determine the timezone of the dateStr or if none, use the local timezone
        timezone = dateStr.match(/([+-])(1[0-2]|[0]?[1-9]):?([0-6][0-9])(?:$|\s)/);
        if (timezone) {
            offset = (parseInt(timezone[2]) * 3600000) + (parseInt(timezone[3]) * 60000);
            offset = (timezone[1] === '+') ? offset : offset * -1;
        } else if (dateStr.search(/GMT|Z/) === -1) {
            offset = new Date().getTimezoneOffset() * 60000;
        }

        //create a date object that is relative to UTC
        date = new Date(dateStr);
        date = new Date(date.getTime() - offset);

        //helpers
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        pad = function(n){return n<10 ? '0'+n : n};

        //retrieve the format string from the compiled Handlebars template
        format = format().trim();

        //create result string
        for (i = 0; i < format.length; i++) {
            switch (format[i]) {

                //Day of the month, 2 digits with leading zeros	(01 to 31)
                case 'd':
                    result += pad(date.getUTCDate());
                    break;

                //A full textual representation of a month    (January through December)
                case 'F':
                    result += months[date.getUTCMonth()];
                    break;

                //24-hour format of an hour without leading zeros	(0 through 23)
                case 'G':
                    result += date.getUTCHours();
                    break;

                //Day of the month without leading zeros  (1 to 31)
                case 'j':
                    result += date.getUTCDate();
                    break;

                //Numeric representation of a month, with leading zeros	(01 through 12)
                case 'm':
                    result += pad(date.getUTCMonth() + 1);

                //A full numeric representation of a year, 4 digits   (e.g. 1999 or 2003)
                case 'Y':
                    result += date.getUTCFullYear();
                    break;

                //Allow other characters to pass through   (e.g. space, colon, etc.)
                default:
                    result += format[i];
            }
        }
        return result;
    };
})