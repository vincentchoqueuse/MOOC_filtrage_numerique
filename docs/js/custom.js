document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, 
      {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
          ]
      }
    )});

document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (event.target.id != 'nav-button') return;

    event.preventDefault();
    sidebar = sidebar == true ? false : true;
    console.log(sidebar);
    var col1 = element = document.getElementById("col1");
    var col2 = element = document.getElementById("col2");

    col1.classList.toggle('col-sm-2');
    col1.classList.toggle('d-none');
    col2.classList.toggle('col-md-9');
    col2.classList.toggle('col-md-8');
    col2.classList.toggle('offset-md-2');
    }, false);
