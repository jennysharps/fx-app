define([
    'backbone',
], function(Backbone) {
    var originalUnderscoreTemplateFunction = _.template;
    var templateHelpers = {};

    _.mixin({
        addTemplateHelpers : function(newHelpers) {
            _.extend(templateHelpers, newHelpers);
        },
        template : function(text, data, settings) {
            // replace the built in _.template function with one that supports the addTemplateHelpers
            // function above. Basically the combo of the addTemplateHelpers function and this new
            // template function allows us to mix in global "helpers" to the data objects passed
            // to all our templates when they render. This replacement template function just wraps
            // the original _.template function, so it sould be pretty break-resistent moving forward.

            if(data) {
                _.defaults(data, templateHelpers); // extend data with our helper functions
                return originalUnderscoreTemplateFunction.apply(this, arguments);
            }
            
            var template = originalUnderscoreTemplateFunction.apply(this, arguments);

            var wrappedTemplate = function(data) {
                data = _.defaults({}, data, templateHelpers);
                return template.call(this, data);
            };

            return wrappedTemplate;
        }
    });

    var helpers = {};

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var monthShortNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sept", "Oct",
        "Nov", "Dec"
    ];

    var ordinalSuffixes = {
        default: 'th',
        1: 'st',
        2: 'nd',
        3: 'rd',
        21: 'st',
        22: 'nd',
        23: 'rd',
        31: 'st'
    };

    helpers.formatTime = function(date, format) {
        var dateObj = typeof date.getTime === 'function' ? date : new Date(date);

        return format
            .replace(/Y/g, dateObj.getFullYear())
            .replace(/y/g, dateObj.getFullYear().toString().slice(2,4))
            .replace(/G/g, dateObj.getHours())
            .replace(/i/g, dateObj.getMinutes())
            .replace(/j/g, dateObj.getDate())
            .replace(/d/g, ("0" + dateObj.getDate()).slice(-2))
            .replace(/m/g, ("0" + (dateObj.getMonth()+1)).slice(-2))
            .replace(/n/g, dateObj.getMonth()+1)
            .replace(/F/g, monthNames[dateObj.getMonth()])
            .replace(/M/g, monthShortNames[dateObj.getMonth()])
            .replace(/S/g, function() {
                var date = dateObj.getDate();

                if(ordinalSuffixes[date] !== undefined) {
                    return ordinalSuffixes[date];
                } else {
                    return ordinalSuffixes['default'];
                }
            });
    };

    _.addTemplateHelpers(helpers);
});