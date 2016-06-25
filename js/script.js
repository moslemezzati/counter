$(function () {
    var number = 9;
    CounterDisplay.message = "Number is: ";
    CounterDisplay.number = 10;
    CounterDisplay.withPrefix = true;
    CounterDisplay.withSign = true;
    CounterDisplay.showNumber();

    $(".decrease").click(function () {
        CounterDisplay.decrease(1);
    });

    $(".increase").click(function () {
        CounterDisplay.increase(1);
    });

});