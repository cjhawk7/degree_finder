!(function($) {
  window.onload = function() {
    $(".ba, .ma, .phd, .cert").css("display", "block");
    $(".container").css("display", "block");
    // reference to degree buttons in program button function
    var that;
    var count;
    var countLess;
    var countLessTotal;
    var countTotal;
    var degreeObj = $(".deg");
    // count number of degrees being displayed
    function degreeCount() {
      var countArr = [];
      var listStyle;
      count = 0;
      // loop through all degrees
      for (var i in degreeObj) {
        var countLessArr = [];
        countLess = 0;
        var degObjChild = degreeObj[i].children;
        // loop through all degree children
        for (var j in degObjChild) {
          // setting list class style
          var listStyle = degObjChild[j].attributes;
          // counting degrees for each program
          if (listStyle) {
            if (listStyle[1].value == "display: block;") {
              countLess++;
              countLessArr.push(countLess);
            }
          }
          countLessTotal = countLessArr.length;
          // setting list parent (degree div)
          var listParent = degObjChild[j].parentElement;
          if (listStyle && listParent) {
            if (listParent.parentElement.style) {
              // setting degree container parent (container) style
              var containerStyle = listParent.parentElement.style.display;
              //checking if list div and parent container are both showing and counting if so
              if (
                listStyle[1].value == "display: block;" &&
                containerStyle == "block"
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
        if (countLessArr.length != 0) {
          var degHeader = degreeObj[i].previousElementSibling;
          // checking if degree header p child exists
          if (degHeader) {
            if (degHeader.children[1]) {
              var degreeCount = degHeader.children[1];
              $(degreeCount).append(countLessTotal);
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
      for (var i in degreeObj) {
        var maxHeight;
        if (degreeObj[i].previousElementSibling) {
          var headerHeight = degreeObj[i].previousElementSibling.clientHeight;
        }
        var listCount = 0;
        if (degreeObj[i]) {
          var degObjChild = degreeObj[i].children;
          // checking if expand button exists on page and assigning
          if (degreeObj[i].nextElementSibling) {
            var expandButton = degreeObj[i].nextElementSibling;
            var degObjWidth = degreeObj[i].clientWidth;
            if (degObjWidth) {
              $(".expander").css("width", degObjWidth);
            }
          }
        }
        for (var j in degObjChild) {
          if (degObjChild[j].style) {
            // height of each degree list
            var childHeight = degObjChild[j].clientHeight;
            // if degree child list is showing on page
            if (degObjChild[j].style.display == "block" && childHeight != 0) {
              listCount++;
              // show expander if more than 3 programs are available
              if (listCount > 3) {
                $(expandButton).show();
              } else {
                $(expandButton).hide();
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
                maxHeight = heightArr.reduce((a, b) => a + b);
                // adjusting max height plus a bit of padding
                $(degreeObj[i]).css("max-height", maxHeight + headerHeight);
              }
            }
          }
        }
      }
    }
    adjustHeight();
    //degree click handlers
    $(".degree-button").click(function() {
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
      $(".program-button")
        .attr("disabled", false)
        .removeClass("disabled");
      // degree button show/hide logic
      this.id == "certificates"
        ? $(
            ".ba, .phd, .ma, .technology, .dissertation, .health-sciences"
          ).hide() &
          $(".cert").show() &
          $("#health-sciences, #technology, #dissertation-completion")
            .attr("disabled", true)
            .addClass("disabled")
            .removeClass("active")
        : this.id == "bachelors"
        ? $(
            ".cert, .phd, .ma, .mft, .dissertation, .health-sciences, .technology"
          ).hide() &
          $(".ba").show() &
          $(
            "#health-sciences, #marriage-and-family-therapy, #technology, #dissertation-completion"
          )
            .attr("disabled", true)
            .addClass("disabled")
            .removeClass("active")
        : this.id == "masters"
        ? $(".cert, .phd, .ba, .dissertation").hide() &
          $(".ma").show() &
          $("#dissertation-completion")
            .attr("disabled", true)
            .addClass("disabled")
            .removeClass("active")
        : this.id == "doctoral"
        ? $(".ba, .cert, .ma").hide() & $(".phd").show()
        : console.log("error");
      if ($(".program-button").hasClass("active")) {
        $("#business").hasClass("active")
          ? $(".business").show()
          : $(".business").hide();
        $("#education").hasClass("active")
          ? $(".education").show()
          : $(".education").hide();
        $("#health-sciences").hasClass("active")
          ? $(".health-sciences").show()
          : $(".health-sciences").hide();
        $("#marriage-and-family-therapy").hasClass("active")
          ? $(".mft").show()
          : $(".mft").hide();
        $("#psychology").hasClass("active")
          ? $(".psychology").show()
          : $(".psychology").hide();
        $("#technology").hasClass("active")
          ? $(".technology").show()
          : $(".technology").hide();
        $("#dissertation-completion").hasClass("active")
          ? $(".dissertation").show()
          : $(".dissertation").hide();
      }
      $(".degree-count").text("");
      $(".count-num").text("");
      degreeCount();
      adjustHeight();
    });
    $(".program-button").click(function() {
      $(".container").hide();
      $(".degree-count").text("");
      $(".count-num").text("");
      // if someone clicks on program button that's currently active do stuff
      if ($(this).hasClass("active")) {
        $(this).toggleClass("active");
        $("#business").hasClass("active")
          ? $(".business").toggle()
          : $(".business").hide();
        $("#education").hasClass("active")
          ? $(".education").toggle()
          : $(".education").hide();
        $("#health-sciences").hasClass("active")
          ? $(".health-sciences").toggle()
          : $(".health-sciences").hide();
        $("#marriage-and-family-therapy").hasClass("active")
          ? $(".mft").toggle()
          : $(".mft").hide();
        $("#psychology").hasClass("active")
          ? $(".psychology").toggle()
          : $(".psychology").hide();
        $("#technology").hasClass("active")
          ? $(".technology").toggle()
          : $(".technology").hide();
        $("#dissertation-completion").hasClass("active")
          ? $(".dissertation").toggle()
          : $(".dissertation").hide();
        // if no program buttons are active click currently active degree button
        if ($(".program-button").hasClass("active") == false) {
          if ($(".degree-button").hasClass("active") == false) {
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
      this.id == "business" || $("#business").hasClass("active")
        ? $("#business").addClass("active") & $(".business").toggle()
        : $(".business").hide();
      this.id == "education" || $("#education").hasClass("active")
        ? $("#education").addClass("active") & $(".education").toggle()
        : $(".education").hide();
      this.id == "health-sciences" || $("#health-sciences").hasClass("active")
        ? $("#health-sciences").addClass("active") &
          $(".health-sciences").toggle()
        : $(".health-sciences").hide();
      this.id == "marriage-and-family-therapy" ||
      $("#marriage-and-family-therapy").hasClass("active")
        ? $("#marriage-and-family-therapy").addClass("active") &
          $(".mft").toggle()
        : $(".mft").hide();
      this.id == "psychology" || $("#psychology").hasClass("active")
        ? $("#psychology").addClass("active") & $(".psychology").toggle()
        : $(".psychology").hide();
      this.id == "technology" || $("#technology").hasClass("active")
        ? $("#technology").addClass("active") & $(".technology").toggle()
        : $(".technology").hide();
      this.id == "dissertation" ||
      $("#dissertation-completion").hasClass("active")
        ? $("#dissertation-completion").addClass("active") &
          $(".dissertation").toggle()
        : $(".dissertation").hide();
      degreeCount();
      adjustHeight();
    });
    // clear filter button
    $(".filter-button").click(function() {
      $(".degree-count").text("");
      $(".count-num").text("");
      $(".deg, .list, .container").show();
      $(".degree-button, .program-button").removeClass("active");
      $(".program-button")
        .attr("disabled", false)
        .removeClass("disabled");
      $(".expander").show();
      $("html, body").animate(
        {
          scrollTop: $(".breadcrumb").scrollTop()
        },
        500
      );
      degreeCount();
      adjustHeight();
    });
    // expand programs button
    $(".expander").click(function() {
      this.id == "bus-expand"
        ? $(".business-degrees").css("max-height", "none") &
          $("#bus-expand").hide()
        : this.id == "edu-expand"
        ? $(".education-degrees").css("max-height", "none") &
          $("#edu-expand").hide()
        : this.id == "health-expand"
        ? $(".health-sciences-degrees").css("max-height", "none") &
          $("#health-expand").hide()
        : this.id == "mft-expand"
        ? $(".mft-degrees").css("max-height", "none") & $("#mft-expand").hide()
        : this.id == "psy-expand"
        ? $(".psychology-degrees").css("max-height", "none") &
          $("#psy-expand").hide()
        : this.id == "tech-expand"
        ? $(".technology-degrees").css("max-height", "none") &
          $("#tech-expand").hide()
        : this.id == "dis-expand"
        ? $(".dissertation-degrees").css("max-height", "none") &
          $("#dis-expand").hide()
        : console.log("error");
    });
  };
})(jQuery);
