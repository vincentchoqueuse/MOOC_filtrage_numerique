
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
  }
);

function change_toc()
{
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle('active');

    var content = document.getElementById("content");
    content.classList.toggle('active');

    var btn_toc = document.getElementById("btn-toc");
    btn_toc.classList.toggle('hidden');

    var btn_content = document.getElementById("btn-content");
    btn_content.classList.toggle('hidden');
}

document.addEventListener('click', function (event) {
    
    if ((event.target.id == 'btn-content') || (event.target.id == 'btn-toc')) 
      {
        change_toc();
      }
    if (event.target.closest("#TableOfContents"))
      {
        change_toc();
      }
    }, false);
