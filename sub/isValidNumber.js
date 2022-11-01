var telInput = $("#phone"),
  errorMsg = $("#error-msg"),
  validMsg = $("#valid-msg");

// initialise plugin
/*$("#phone").intlTelInput({
  initialCountry: "auto",
  separateDialCode: true,
  autoPlaceholder: "aggressive",
  geoIpLookup: function (callback) {
      jQuery.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
      });
  },
  utilsScript: "utils.js"
});*/

var inputcheck = document.querySelector("#phone");

var iti = window.intlTelInput(inputcheck, {
  initialCountry: "auto",
  separateDialCode: true,
  autoPlaceholder: "aggressive",
  geoIpLookup: function (callback) {
      jQuery.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
      });
  },
  utilsScript: "utils.js"
});

var errorMap = ["Invalid number", "Invalid number", "Invalid number", "Invalid number", "Invalid number"];

var reset = function() {
  inputcheck.classList.remove("error");
  errorMsg.addClass("hide");
  validMsg.addClass("hide");
};



// on blur: validate
inputcheck.addEventListener('blur', function() {
  reset();
  if (inputcheck.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.removeClass("hide");
    } else {
      inputcheck.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.removeClass("hide");

    }
  }
});

// on keyup / change flag: reset
inputcheck.addEventListener('change', reset);
inputcheck.addEventListener('keyup', reset);
