console.log("Its working");

let theme = localStorage.getItem("theme");

if (theme == null) {
  setTheme("light");
} else {
  setTheme(theme);
}

let themeDots = document.getElementsByClassName("theme-dot");

for (var i = 0; themeDots.length > i; i++) {
  themeDots[i].addEventListener("click", function () {
    let mode = this.dataset.mode;
    console.log("Option clicked:", mode);
    setTheme(mode);
  });
}

function setTheme(mode) {
  if (mode == "light") {
    document.getElementById("theme-style").href = "css/default.css";
  }

  if (mode == "blue") {
    document.getElementById("theme-style").href = "css/blue.css";
  }

  if (mode == "green") {
    document.getElementById("theme-style").href = "css/green.css";
  }

  if (mode == "purple") {
    document.getElementById("theme-style").href = "css/purple.css";
  }

  localStorage.setItem("theme", mode);
}

// Form Submission Handling
$(function () {
  function after_form_submitted(data) {
    if (data.result == "success") {
      $("form#contact-form").hide();
      $("#success_message").show();
      $("#error_message").hide();
    } else {
      $("#error_message").append("<ul></ul>");

      jQuery.each(data.errors, function (key, val) {
        $("#error_message ul").append("<li>" + key + ":" + val + "</li>");
      });
      $("#success_message").hide();
      $("#error_message").show();

      //reverse the response on the button
      $('button[type="button"]', $form).each(function () {
        $btn = $(this);
        label = $btn.prop("orig_label");
        if (label) {
          $btn.prop("type", "submit");
          $btn.text(label);
          $btn.prop("orig_label", "");
        }
      });
    } //else
  }

  $("#contact-form").submit(function (e) {
    e.preventDefault();

    $form = $(this);
    //show some response on the button
    $('button[type="submit"]', $form).each(function () {
      $btn = $(this);
      $btn.prop("type", "button");
      $btn.prop("orig_label", $btn.text());
      $btn.text("Sending ...");
    });

    $.ajax({
      type: "POST",
      url: "handler.php",
      data: $form.serialize(),
      success: after_form_submitted,
      dataType: "json",
    });
  });
});
