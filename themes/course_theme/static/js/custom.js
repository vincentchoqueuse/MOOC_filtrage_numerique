var menu="true";

function switch_col()
{
  var col1 = element = document.getElementById("col1");
  var col2 = element = document.getElementById("col2");

  col1.classList.toggle('col-sm-2');
  col1.classList.toggle('d-none');
  col2.classList.toggle('col-sm-8');
  col2.classList.toggle('col-lg-8');
  col2.classList.toggle('offset-lg-2');
}

document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, 
      {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
          ]
      });

    //get local storage for menu
    if (typeof(Storage) !== "undefined") {
      if (localStorage.menu)
      {
        menu = localStorage.getItem("menu");
        if (menu=="false")
        {
          switch_col();
        }
      }
    }
    }
  );

document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (event.target.id != 'nav-button') return;

    event.preventDefault();
    menu = (menu == "true") ? "false" : "true";
    switch_col()
    localStorage.setItem("menu",menu);

    }, false);
