

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

      var toc = document.getElementById("TableOfContents");
      if (toc)
      {
      toc.addEventListener('click', function (event) {
        change_toc();
        }, false);
      }
      

  }
);

function change_toc()
{
    var row = element = document.getElementById("main-row");
    row.classList.toggle('toc');

    var btn_toc = document.getElementById("btn-toc");
    btn_toc.classList.toggle('toc');

    var btn_content = document.getElementById("btn-content");
    btn_content.classList.toggle('toc');
}

document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (event.target.id != 'nav-button') return;
    event.preventDefault();
    change_toc();
    }, false);



