"use strict";

var CounterDisplay = (function () {
    var digitClass = "counter-digit";
    var initNumber;
    var my = {};
    var numberPrefix = 0;
    var prefix = 0;
    my.message = "Number is: ";
    my.number = 0;
    my.withPrefix = true;
    my.withSign = true;
    my.element = ".counter-wrapper";
    my.showNumber = function () {
        var element = $(my.element);
        element.html("");

        var digitNumbers = my.digits(my.number);
        var contentLabel = $("<span/>");
        var content = $("<span/>");
        contentLabel.addClass("counter-label").text(my.message);
        element.append(contentLabel);
        var contentDigits = $("<span/>");

        contentDigits.addClass("counter-digits").data("answer-remaining", digitNumbers.length);
        element.append(contentDigits);

        if (typeof initNumber === "undefined") {
            initNumber = my.number;
        }
        if (prefix == 0) {
            var numberDigitInit = my.digits(initNumber).length;
            var numberDigitNumber = my.digits(my.number).length;

            if (numberDigitInit >= numberDigitNumber)
                numberPrefix = numberDigitInit - numberDigitNumber;

            if (!my.withPrefix)
                numberPrefix = 0;
        } else {
            numberPrefix = prefix;
        }

        if (my.number < 0 && my.withSign) {
            content.addClass(digitClass).text("-");
            element.append(content);
        }

        for (var i = digitNumbers.length + numberPrefix - 1; i >= 0; --i) {
            var digitNumber = ( typeof digitNumbers[i] === "undefined") ? 0 : digitNumbers[i];
            content = $("<span/>");
            content.addClass(digitClass).text(digitNumber);
            element.append(content);
        }
    };

    var clearPrefix = function () {
        prefix = 0;
    };

    my.digits = function (number) {
        if (number < 0)
            number *= -1;
        var digit = [];
        do {
            var remain = Math.floor(number % 10);
            digit.push(remain);
            number /= 10;
        } while (number >= 1);

        return digit;
    };

    my.decrease = function (step, numberPrefix) {
        if (typeof step == "undefined")
            --my.number;
        else my.number -= step;

        clearPrefix();
        //when user want to specify how many prefix wants
        if (typeof numberPrefix !== "undefined") {
            prefix = numberPrefix;
            my.showNumber();
        } else {
            my.showNumber();
        }
    };

    my.increase = function (step, numberPrefix) {
        if (typeof step == "undefined")
            ++my.number;
        else my.number += step;

        clearPrefix();

        //when user want to specify how many prefix wants
        if (typeof numberPrefix !== "undefined") {
            prefix = numberPrefix;
            my.showNumber();
        } else {
            my.showNumber();
        }
    };

    return my;
}());