(function() {
  var $ = document.querySelector.bind(document)

  $('#contactForm').addEventListener('submit', function(e) {
    e.preventDefault()

                // Store form field values
                var name = $("input#name").value;
                var email = $("input#email").value;
                var phone = $("input#phone").value;
                var message = $("textarea#message").value;

                    // AJAX request
                    request = new XMLHttpRequest(),
                    data = {
                      name: name,
                      phone: phone,
                      mail: email,
                      message: message
                  }

                // Send to Formspree or Basin
                request.open('POST', 'https://usebasin.com/f/3c10f10b722f.json', true)
                request.setRequestHeader('Content-Type', 'application/json')
                request.setRequestHeader('Accept', 'application/json')
                // Call function when the state changes
                request.onreadystatechange = function() {
                  if (request.readyState === 4 && request.status === 200) {
                    // Success message
                    successFunc()
                } else {
                    errorFunc()
                }
            }

            request.send(JSON.stringify(data))
        })
})()

function successFunc() {
                                // Success message
                                $('#success').html("<div class='alert alert-success'>");
                                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                                $('#success > .alert-success')
                                .append("<strong>Iremos entrar em contacto consigo assim que possível! </strong>");
                                $('#success > .alert-success')
                                .append('</div>');

                                //clear all fields
                                $('#contactForm').trigger("reset");
                            }

                            function errorFunc() {
                                // Fail message
                                $('#success').html("<div class='alert alert-danger'>");
                                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                                $('#success > .alert-danger').append("<strong>Ocorreu um erro! Por favor, entre em contacto via telefonica!");
                                $('#success > .alert-danger').append('</div>');
                                //clear all fields
                                $('#contactForm').trigger("reset");
                            }
