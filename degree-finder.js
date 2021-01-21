// posting degrees and programs
!(function ($) {
  window.onload = function getPrograms() {
    $(".ba, .ma, .phd, .cert").css("display", "block");
    $(".container").css("display", "block");
    // reference to degree buttons in program button function
    var that;
    var count;
    var countSub;
    var countSubTotal;
    var countTotal;
    var hiddenDegrees;
    var degreeObj = $(".deg");
    // count number of degrees being displayed
    function degreeCount() {
      var countArr = [];
      var listStyle;
      count = 0;
      // loop through all degrees
      for (var i in degreeObj) {
        var countSubArr = [];
        countSub = 0;
        var degObjChild = degreeObj[i].children;
        // loop through all degree children
        for (var j in degObjChild) {
          // setting list class style
          var listStyle = degObjChild[j].attributes;
          // counting degrees for each program
          if (listStyle) {
            console.log(listStyle)
            if (listStyle[1].value == "display: block;" || listStyle[1].value == "display: block; visibility: hidden;" || listStyle[1].value == "display: block; visibility: visible;") {
              countSub++;
              countSubArr.push(countSub);
            }
          }
          countSubTotal = countSubArr.length;
          // setting list parent (degree div)
          var listParent = degObjChild[j].parentElement;
          if (listStyle && listParent) {
            if (listParent.parentElement.style) {
              // setting degree container parent (container) style
              var containerStyle = listParent.parentElement.style.display;
              //checking if list div and parent container are both showing and counting if so
              if (
                listStyle[1].value == "display: block;" || listStyle[1].value == "display: block; visibility: hidden;" || listStyle[1].value == "display: block; visibility: visible;" &&
                containerStyle == "block;"
              ) {
                count++;
                // push degree count into array and get the total amount
                countArr.push(count);
                countTotal = countArr.length;
              }
            }
          }
        }
        // appending number of degrees for each program to header
        if (countSubArr.length != 0) {
          var degHeader = degreeObj[i].previousElementSibling;
          // checking if degree header p child exists
          if (degHeader) {
            if (degHeader.children[1]) {
              var degreeCount = degHeader.children[1];
              $(degreeCount).append(countSubTotal);
            }
          }
        }
      }
      $(".count-num").prepend(countTotal);
    }
    degreeCount();
    // adjust the height of containers
    function adjustHeight() {
      var lastEl;
      var heightArr = [];
      var expandButton;
      var listCountSub = 0;
      for (var i in degreeObj) {
        var maxHeight;
        if (degreeObj[i].previousElementSibling) {
          var headerHeight = degreeObj[i].previousElementSibling.clientHeight;
        }
        var listCount = 0;
        if (degreeObj[i]) {
          if (degreeObj[i].children === undefined) {
            continue;
          }
          var degObjChild = degreeObj[i].children;
          // checking if expand button exists on page and assigning
          if (degreeObj[i].nextElementSibling) {
            expandButton = degreeObj[i].nextElementSibling;
            var degObjWidth = degreeObj[i].clientWidth;
            if (degObjWidth) {
              $(".expander").css("width", degObjWidth);
            }
          }
        }
        var visibleArr = [];
        for (var j in degObjChild) {
          if (degObjChild[j].style) {
            // height of each degree list
            var childHeight = degObjChild[j].clientHeight;
            // if degree child list is showing on page
            if (degObjChild[j].style.display == "block" && childHeight != 0) {
              visibleArr.push(degObjChild[j])
              listCount++;
              if (listCount > 3) {
                hiddenDegrees = visibleArr.slice(3, visibleArr.length);
                $(expandButton).show();
              } else {
                $(expandButton).hide();
                // prevents collapsing container if view more and is expanded and program at glance is clicked
              }
              // checking first three degrees
              if (listCount <= 3) {
                // need to clear array if more than 3
                if (heightArr.length > 2) {
                  // need last num in array to add to new array
                  lastEl = heightArr.pop();
                  heightArr = [];
                }
                // need to adjust if previous programs only have 2 degrees listed
                if (
                  (listCount == 3 && heightArr.length == 1) ||
                  (listCount == 2 && heightArr.length == 0)
                ) {
                  // add last height from array after cleared
                  heightArr.push(lastEl);
                }
                // need to adjust if previous program only has 1 degree listed
                if (listCount == 3 && heightArr.length == 0) {
                  heightArr.push(lastEl * 2);
                }
                heightArr.push(childHeight);
                maxHeight = heightArr.reduce(function (a, b) {
                  return a + b;
                });
                // adjusting max height plus a bit of padding
                $(degreeObj[i]).css("max-height", maxHeight + headerHeight);
              }
            }
          }
        }
        $(hiddenDegrees).css({ "visibility": "hidden" })
      }
    }
    adjustHeight();
    //degree click handlers
    $(".degree-button").click(function () {
      $(".degree-count").text("");
      // if degree button pushed while active do stuff
      if ($(this).hasClass("active")) {
        if ($(".program-button").hasClass("active")) {
          $(this).removeClass("active");
          $(this).click();
          return;
        }
      }
      // clearing num count
      $(".count-num").text("");
      // need reference to degree buttons in program button function
      that = this;
      $(".container").show();
      $(".degree-button").removeClass("active");
      // making sure program buttons are disabled until degree button is pushed
      $(this).addClass("active");
      $(".program-button").attr("disabled", false).removeClass("disabled");
      this.id == "certificates" ? $(".ba, .phd, .ma, .technology, .dissertation, .health-sciences, .social, .glance-expander").attr('style', 'display: none !important') &
        $(".cert, .law").attr('style', 'display: block;') & $('input#bachelors, input#masters, input#doctoral').prop("checked", false) &
        $(
          "#health-sciences, #technology, #dissertation-completion, #social-work"
        )
          .attr("disabled", true)
          .addClass("disabled")
          .removeClass("active")
          .prop("checked", false)
        & $('label[for="health-sciences"], label[for="technology"], label[for="dissertation-completion"], label[for="social-work"]').addClass("disabled") & $('label[for="education"], label[for="marriage-and-family-therapy"], label[for="business"], label[for="psychology"]').removeClass("disabled")
        : this.id == "bachelors"
          ? $(
            ".cert, .phd, .ma, .mft, .dissertation, .health-sciences, .technology, .social, .education"
          ).attr('style', 'display: none') &
          $(".ba, .glance-expander").attr('style', 'display: block;') & $('input#certificates, input#masters, input#doctoral').prop("checked", false) &
          $(
            "#health-sciences, #marriage-and-family-therapy, #technology, #dissertation-completion, #social-work, #education"
          )
            .attr("disabled", true)
            .addClass("disabled")
            .removeClass("active")
            .prop("checked", false)
          & $('label[for="health-sciences"], label[for="technology"], label[for="dissertation-completion"], label[for="social-work"], label[for="education"], label[for="marriage-and-family-therapy"]').addClass("disabled") & $('label[for="law"]').removeClass("disabled").prop("checked", false)
          : this.id == "masters"
            ? $(".cert, .phd, .ba, .dissertation, .law").attr('style', 'display: none') &
            $(".ma, .glance-expander").attr('style', 'display: block;') & $('input#certificates, input#bachelors, input#doctoral').prop("checked", false) &
            $("#dissertation-completion, #law")
              .attr("disabled", true)
              .addClass("disabled")
              .removeClass("active")
              .prop("checked", false)
            & $('label[for="dissertation-completion"], label[for="law"]').addClass("disabled") & $('label[for="health-sciences"], label[for="social-work"], label[for="technology"], label[for="education"], label[for="marriage-and-family-therapy"], label[for="business"], label[for="psychology"]').removeClass("disabled").prop("checked", false)
            : this.id == "doctoral"
              ? $(".ba, .cert, .ma, .social").attr('style', 'display: none') &
              $(".phd, .glance-expander").attr('style', 'display: block;') & $('input#certificates, input#bachelors, input#masters').prop("checked", false) &
              $("#social-work")
                .attr("disabled", true)
                .addClass("disabled")
                .removeClass("active")
                .prop("checked", false)
              & $('label[for="social-work"]').addClass("disabled") & $('label[for="health-sciences"], label[for="technology"], label[for="dissertation-completion"], label[for="education"], label[for="marriage-and-family-therapy"], label[for="law"], label[for="business"], label[for="psychology"]').removeClass("disabled").prop("checked", false)
              : console.log("error");
      if ($(".program-button").hasClass("active")) {
        $("#business").hasClass("active")
          ? $(".business").show()
          : $(".business").hide() & $(".business-degrees").children().css({ "display": "none" });
        $("#education").hasClass("active")
          ? $(".education").show()
          : $(".education").hide() & $(".education-degrees").children().css({ "display": "none" });
        $("#health-sciences").hasClass("active")
          ? $(".health-sciences").show()
          : $(".health-sciences").hide() & $(".health-sciences-degrees").children().css({ "display": "none" });
        $("#marriage-and-family-therapy").hasClass("active")
          ? $(".mft").show()
          : $(".mft").hide() & $(".mft-degrees").children().css({ "display": "none" });
        $("#psychology").hasClass("active")
          ? $(".psychology").show()
          : $(".psychology").hide() & $(".psychology-degrees").children().css({ "display": "none" });
        $("#technology").hasClass("active")
          ? $(".technology").show()
          : $(".technology").hide() & $(".technology-degrees").children().css({ "display": "none" });
        $("#dissertation-completion").hasClass("active")
          ? $(".dissertation").show()
          : $(".dissertation").hide() & $(".dissertation-degrees").children().css({ "display": "none" });
        $("#social-work").hasClass("active")
          ? $(".social").show()
          : $(".social").hide() & $(".social-degrees").children().css({ "display": "none" });
        $("#law").hasClass("active") ? $(".law").show() : $(".law").hide() & $(".law-degrees").children().css({ "display": "none" });
      }
      $(".degree-count").text("");
      $(".count-num").text("");
      degreeCount();
      adjustHeight();
    });
    $(".program-button").click(function () {
      $(".container").hide();
      $(".degree-count").text("");
      $(".count-num").text("");
      // if someone clicks on program button that's currently active do stuff
      if ($(this).hasClass("active")) {
        $(this).toggleClass("active");
        $("#business").hasClass("active")
          ? $(".business").toggle()
          : $(".business").hide() & $(".business-degrees").children().css({ "display": "none" });
        $("#education").hasClass("active")
          ? $(".education").toggle()
          : $(".education").hide() & $(".education-degrees").children().css({ "display": "none" });
        $("#health-sciences").hasClass("active")
          ? $(".health-sciences").toggle()
          : $(".health-sciences").hide() & $(".health-sciences-degrees").children().css({ "display": "none" });
        $("#marriage-and-family-therapy").hasClass("active")
          ? $(".mft").toggle()
          : $(".mft").hide() & $(".mft-degrees").children().css({ "display": "none" });
        $("#psychology").hasClass("active")
          ? $(".psychology").toggle()
          : $(".psychology").hide() & $(".psychology-degrees").children().css({ "display": "none" });
        $("#technology").hasClass("active")
          ? $(".technology").toggle()
          : $(".technology").hide() & $(".technology-degrees").children().css({ "display": "none" });
        $("#dissertation-completion").hasClass("active")
          ? $(".dissertation").toggle()
          : $(".dissertation").hide() & $(".dissertation-degrees").children().css({ "display": "none" });
        $("#social-work").hasClass("active")
          ? $(".social").toggle()
          : $(".social").hide() & $(".social-degrees").children().css({ "display": "none" });
        $("#law").hasClass("active") ? $(".law").toggle() : $(".law").hide() & $(".law-degrees").children().css({ "display": "none" });
        // if no program buttons are active click currently active degree button
        if ($(".program-button").hasClass("active") == false) {
          if ($(".degree-button").hasClass("active") == false) {
            $(degreeObj).children().css({ "display": "block" })
            $(".container").show();
            $(".expander").show();
            degreeCount();
            adjustHeight();
            return;
          }
          $(".degree-count").text("");
          $(".count-num").text("");
          $(that).click();
          return;
        }
        degreeCount();
        adjustHeight();
        return;
      }
      // program button show/hide logic
      $(this).addClass("active");
      if (this.id == "business" || $("#business").hasClass("active")) {
        $("#business").addClass("active");
        $(".business").toggle();
      } else {
        $(".business").hide() & $(".business-degrees").children().css({ "display": "none" });
      }
      if (this.id == "education" || $("#education").hasClass("active")) {
        $("#education").addClass("active");
        $(".education").toggle();
        $(".education-degrees").children().css({ "display": "block" });
      } else {
        $(".education").hide() & $(".education-degrees").children().css({ "display": "none" });
      }
      if (this.id == "health-sciences" || $("#health-sciences").hasClass("active")) {
        $("#health-sciences").addClass("active");
        $(".health-sciences").toggle();
        $(".health-sciences-degrees").children().css({ "display": "block" });
      } else {
        $(".health-sciences").hide() & $(".health-sciences-degrees").children().css({ "display": "none" });
      }
      if (this.id == "marriage-and-family-therapy" || $("#marriage-and-family-therapy").hasClass("active")) {
        $("#marriage-and-family-therapy").addClass("active");
        $(".mft").toggle();
        $(".mft-degrees").children().show();
      } else {
        $(".mft").hide() & $(".mft-degrees").children().css({ "display": "none" });
      }
      if (this.id == "psychology" || $("#psychology").hasClass("active")) {
        $("#psychology").addClass("active");
        $(".psychology").toggle();
        $(".psychology-degrees").children().css({ "display": "block" });
      } else {
        $(".psychology").hide() & $(".psychology-degrees").children().css({ "display": "none" });
      }
      if (this.id == "technology" || $("#technology").hasClass("active")) {
        $("#technology").addClass("active");
        $(".technology").toggle();
        $(".technology-degrees").children().css({ "display": "block" });
      } else {
        $(".technology").hide() & $(".technology-degrees").children().css({ "display": "none" });
      }
      if (this.id == "dissertation-completion" || $("#dissertation-completion").hasClass("active")) {
        $("#dissertation-completion").addClass("active");
        $(".dissertation-completion").toggle();
        $(".dissertation-completion-degrees").children().css({ "display": "block" });
      } else {
        $(".dissertation-completion").hide() & $(".dissertation-completion").children().css({ "display": "none" });
      }
      if (this.id == "social-work" || $("#social-work").hasClass("active")) {
        $("#social-work").addClass("active");
        $(".social").toggle();
        $(".social-work-degrees").children().css({ "display": "block" });
      } else {
        $(".social-work").hide() & $(".social-work-degrees").children().css({ "display": "none" });
      }
      if (this.id == "law" || $("#law").hasClass("active")) {
        $("#law").addClass("active");
        $(".law").toggle();
        $(".law-degrees").children().css({ "display": "block" });
      } else {
        $(".law").hide() & $(".law-degrees").children().css({ "display": "none" });
      }
      if ($(".degree-button").hasClass("active") == true) {
        $(".degree-button.active").click();
        $(".degree-count").text("");
        $(".count-num").text("");
      }
      degreeCount();
      adjustHeight();
    });
    // clear filter button
    $(".filter-button").click(function () {
      $(".popup").addClass("slide-down");
      $(".popup").hide();
      $(".glance-expander").show();
      $(".degree-count").text("");
      $(".count-num").text("");
      $(".list").css("visibility", "");
      $(".deg, .list, .container").show();
      $(".list").css({ "display": "block" })
      $(".degree-button, .program-button").removeClass("active");
      $(".program-button").attr("disabled", false).removeClass("disabled");
      $('input.program-button').prop("checked", false);
      $('input#certificates, input#bachelors, input#doctoral, input#masters').prop("checked", false) &
        $('label[for="health-sciences"], label[for="technology"], label[for="dissertation-completion"], label[for="social-work"], label[for="education"], label[for="marriage-and-family-therapy"], label[for="law"]').removeClass("disabled")
      $(".expander").show();
      $("html, body").animate(
        {
          scrollTop: $(".breadcrumb").scrollTop(),
        },
        500
      );
      degreeCount();
      adjustHeight();
    });
    // expand programs button
    $(".expander").click(function () {
      adjustHeight();
      this.id == "bus-expand"
        ? $(".business-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) &
        $("#bus-expand").hide()
        : this.id == "edu-expand"
          ? $(".education-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) &
          $("#edu-expand").hide()
          : this.id == "health-expand"
            ? $(".health-sciences-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) &
            $("#health-expand").hide()
            : this.id == "mft-expand"
              ? $(".mft-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) & $("#mft-expand").hide()
              : this.id == "psy-expand"
                ? $(".psychology-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) &
                $("#psy-expand").hide()
                : this.id == "tech-expand"
                  ? $(".technology-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) &
                  $("#tech-expand").hide()
                  : this.id == "dis-expand"
                    ? $(".dissertation-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) &
                    $("#dis-expand").hide()
                    : this.id == "soc-expand"
                      ? $(".social-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) &
                      $("#soc-expand").hide()
                      : this.id == "law-expand"
                        ? $(".law-degrees").css("max-height", "none") & $(this).prev().children().css({ "visibility": "visible" }) & $("#law-expand").hide()
                        : console.log("error");
    });
  }
})(jQuery);