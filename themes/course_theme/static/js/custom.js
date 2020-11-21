

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
      // add button for cod
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


document.querySelectorAll(".highlight").forEach(highlightDiv => createCopyButton(highlightDiv));

function createCopyButton(highlightDiv) {
  const button = document.createElement("button");
  button.className = "copy-code-button";
  button.type = "button";
  button.innerText = "Copy";
  button.addEventListener("click", () => copyCodeToClipboard(button, highlightDiv));
  addCopyButtonToDom(button, highlightDiv);
}

function codeWasCopied(button) {
  button.blur();
  button.innerText = "Copied!";
  setTimeout(function() {
    button.innerText = "Copy";
  }, 2000);
}

function addCopyButtonToDom(button, highlightDiv) {
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
  const wrapper = document.createElement("div");
  wrapper.className = "highlight-wrapper";
  highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
  wrapper.appendChild(highlightDiv);
}


async function copyCodeToClipboard(button, highlightDiv) {
  const codeToCopy = highlightDiv.querySelector(":last-child > pre").innerText;
  try {
    result = await navigator.permissions.query({ name: "clipboard-write" });
    if (result.state == "granted" || result.state == "prompt") {
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      copyCodeBlockExecCommand(codeToCopy, highlightDiv);
    }
  } catch (_) {
    copyCodeBlockExecCommand(codeToCopy, highlightDiv);
  }
  finally {
    codeWasCopied(button);
  }
}

function copyCodeBlockExecCommand(codeToCopy, highlightDiv) {
  const textArea = document.createElement("textArea");
  textArea.contentEditable = 'true'
  textArea.readOnly = 'false'
  textArea.className = "copyable-text-area";
  textArea.value = codeToCopy;
  highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
  const range = document.createRange()
  range.selectNodeContents(textArea)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
  textArea.setSelectionRange(0, 999999)
  document.execCommand("copy");
  highlightDiv.removeChild(textArea);
}
