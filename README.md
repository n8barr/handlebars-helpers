handlebars-helpers
==================

Helper methods for Handlebars.js

##Format Date (formatDate)

Generate formatted dates in Handlebars by providing a date string and a format pattern string
This follows the [date pattern API of PHP](http://php.net/manual/en/function.date.php)

###Usage
Template:

    {{#formatDate date}}
        F j, Y
    {{/formatDate}}
    
Data:

    {date: '2012-09-25'}
    
Output:

    September 9, 2012
    
###Notes:
    The current state does not fully implement the PHP date API fully. Feel free to add more. Also, it does not support i18n.