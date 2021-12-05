function copyToClipboard() {
    let text = $("textarea").val();
    navigator.clipboard.writeText(text);
}

function styleShadow() {
    let props = new Array(
        $("input[name='horizontal']").val(),
        $("input[name='vertical']").val(),
        $("input[name='blur']").val(),
        $("input[name='color']").val()
    );

    $("div.display>h1").css("text-shadow",
        props[0] + "px " +
        props[1] + "px " +
        props[2] + "px " +
        props[3]
    );

    let propertiesString = props[0] +
        "px " + props[1] + "px " + props[2] + "px " +
        props[3] + ";";

    $(".css-output > textarea").val("text-shadow: " + propertiesString +
        "\n -webkit-text-shadow: " + propertiesString +
        "\n -moz-text-shadow: " + propertiesString);
}

$(function () {
    styleShadow();
    $("input[type='range']").on("input", function () {
        let rangeValue = $(this).val();
        let parent = $(this).parents(".property");
        parent.find("input[type='number']").val(rangeValue);

        styleShadow();

    })

    $("input[type='number']").on("input", function () {
        let numberValue = $(this).val();
        let parent = $(this).parents(".property");
        parent.find(".bottom > input").val(numberValue);
        styleShadow();
    })

    $("input[type='color']").on("input", function () {
        styleShadow();
    })

    $("button.load-button").on("click", function () {
        $(this).addClass("scaled").hide(150);
        setTimeout(function () {
            $(".lds-ring").css("display", "inline-block");
        }, 400);

        setTimeout(function () {
            $(".lds-ring").css("display", "none");
            $("textarea").css("display", "block");
            $(".copy-button").css("display", "block");
        }, 2200);
    })

    $("button.copy-button").on("click", function () {
        copyToClipboard();
        $("span.tooltip").css("display", "block").css("opacity", "1");
        setTimeout(function () {
            $("span.tooltip").animate({
                opacity: 0
            }, 600).hide(600);

        }, 2200)
    })
})