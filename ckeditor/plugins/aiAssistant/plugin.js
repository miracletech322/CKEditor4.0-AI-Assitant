CKEDITOR.plugins.add('aiAssistant', {
    icons: 'aiAssistant',  // Icon for the button
    init: function (editor) {
        // Add the button to the toolbar
        editor.ui.addButton('aiAssistant', {
            label: 'AI Assistant',
            command: 'openAIDialog',
            toolbar: 'insert', // Customize the toolbar location
            icon: 'plugins/aiAssistant/icons/aiAssistant.png' // A sample icon
        });

        // Command to open the dialog
        editor.addCommand('openAIDialog', {
            exec: function (editor) {
                openDialog(editor);
            }
        });
    }
});

const loadCredits = async () => {
    const res = await fetch('./json.php?action=getcredits', {
        method: 'POST',
    });
    const json = await res.json();
    cke_credits = Number(json.aicredits);

    if (cke_credits <= 0 && document.getElementById("cke-credit") != undefined) {
        document.getElementById("cke-btn-generate").style.display = 'none';
        document.getElementById("ckeQuestionBlock").style.display = 'none';
    }
    if (document.getElementById("cke-credit") != undefined) {
        document.getElementById("cke-credit").innerHTML = `AI Credits: ${cke_credits}`;
    }
}

// Function to open the dialog
async function openDialog(editor) {

    await loadCredits();

    if (cke_aiTrigger == true) {
        var selectedText = editor.getSelection().getSelectedText();
        if (selectedText == "") {
            alert("Please select some text first!");
            cke_aiTrigger = false;
            return;
        }
    }
    // Define the dialog using CKEDITOR.dialog.add()
    CKEDITOR.dialog.add('aiAssistantDialog', function (editor) {
        return {
            title: 'AI Assistant',
            minWidth: 400,
            minHeight: 200,
            contents: [{
                id: 'tab1',
                label: 'AI Inputs',
                elements: [{
                    type: 'html',
                    html: `
                        <div>
                            <div class="dropdown-container" id="ckeQuestionBlock">
                                <label for="cke-question">Question:</label><br>
                                <input type="text" class="input-field cke_dialog_ui_input_text" id="cke-question">
                                <div class="dropdown-menu" id="dropdownMenu">
                                    <div class="dropdown-item">This is sentence 1.</div>
                                    <div class="dropdown-item">This is sentence 2.</div>
                                    <div class="dropdown-item">This is sentence 3.</div>
                                    <div class="dropdown-item">This is sentence 4.</div>
                                    <div class="dropdown-item">This is sentence 5.</div>
                                    <div class="dropdown-item">This is sentence 6.</div>
                                    <div class="dropdown-item">This is sentence 7.</div>
                                    <div class="dropdown-item">This is sentence 8.</div>
                                    <div class="dropdown-item">This is sentence 9.</div>
                                    <div class="dropdown-item">This is sentence 10.</div>
                                </div>
                            </div>
                            <label for="cke-response" class="cke_dialog_ui_input_text">AI Response:</label><br>
                            <textarea readonly id="cke-response" class="cke_dialog_ui_input_textarea" rows="5"></textarea><br><br>
                            <p id="cke-credit">AI Credits: ${cke_credits}</p><br>
                            <a id="cke-btn-generate" class="cke_dialog_ui_button">&nbsp;Generate&nbsp;</a>
                            <a id="cke-btn-insert" class="cke_dialog_ui_button">&nbsp;Insert&nbsp;</a>
                            <a id="cke-btn-replace" class="cke_dialog_ui_button">&nbsp;Replace&nbsp;</a>
                        </div>
                    `
                }]
            }],
            buttons: [{
                id: 'cancel',
                type: 'button',
                label: editor.lang.common.cancel,
                onClick: function () {
                    this.getDialog().hide();
                }
            }]
        };
    });

    // Open the dialog
    editor.openDialog('aiAssistantDialog');

    const handleGenerate = () => {
        ckeHandleGenerate(editor);
    }

    const handleInsert = () => {
        ckeHandleInsert(editor);
    }

    const handleReplace = () => {
        ckeHandleReplace(editor);
    }

    if (document.getElementById("cke-btn-generate").dataset.clickBound == undefined) {
        const dropdownInput = document.getElementById('cke-question');
        const dropdownMenu = document.getElementById('dropdownMenu');

        dropdownInput.addEventListener('click', () => {
            dropdownMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!dropdownInput.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });

        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                dropdownInput.value = item.textContent;
                dropdownMenu.classList.remove('active');
            });
        });

        document.getElementById("cke-btn-generate").addEventListener('click', handleGenerate);
        document.getElementById("cke-btn-insert").addEventListener('click', handleInsert);
        document.getElementById("cke-btn-replace").addEventListener('click', handleReplace);

        document.getElementById("cke-btn-generate").dataset.clickBound = true;
        document.getElementById("cke-btn-insert").dataset.clickBound = true;
        document.getElementById("cke-btn-replace").dataset.clickBound = true;
    }

    if (cke_aiTrigger || cke_credits <= 0) {
        document.getElementById("cke-btn-generate").style.display = 'none';
        document.getElementById("ckeQuestionBlock").style.display = 'none';
    } else {
        document.getElementById("cke-btn-generate").style.display = '';
        document.getElementById("ckeQuestionBlock").style.display = '';
    }
    var selectedText = editor.getSelection().getSelectedText();
    if (cke_aiTrigger) {
        if(cke_credits <= 0) {
            document.getElementById("cke-response").value = "";
            return;
        }
        const res = await fetch(`./json.php?action=${cke_aiCmdType}`, { method: 'POST', body: JSON.stringify({ questionText: selectedText }) });
        const data = await res.json();
        setTimeout(() => {
            document.getElementById("cke-response").value = data.airesponse;
        }, 100)
        await loadCredits();
    }

    cke_aiTrigger = false;

    var selectedText = editor.getSelection().getSelectedText();
    document.getElementById("cke-question").value = selectedText;
    document.getElementById("cke-response").value = "";
}

const ckeHandleGenerate = async (editor) => {
    await loadCredits();

    if (cke_credits < 1) {
        return;
    }

    var questionText = document.getElementById('cke-question').value;

    const res = await fetch('./json.php', { method: 'POST', body: JSON.stringify({ questionText }) });
    const data = await res.json();
    document.getElementById("cke-response").value = data.airesponse;
    await loadCredits();
}

const ckeHandleInsert = (editor) => {
    var responseText = document.getElementById('cke-response').value;

    var selection = editor.getSelection();
    var range = selection.getRanges()[0];

    if (range) {
        var newElement = editor.document.createElement('p');
        newElement.setHtml(responseText);
        range.moveToPosition(CKEDITOR.POSITION_AFTER_END);

        range.insertNode(newElement);

        var newRange = editor.createRange();
        newRange.moveToPosition(newElement, CKEDITOR.POSITION_AFTER_END);
        selection.selectRanges([newRange]);
    } else {
        console.log('No text selected or range is collapsed');
    }

    var dialog = CKEDITOR.dialog.getCurrent();
    dialog.hide();
}

const ckeHandleReplace = (editor) => {
    var responseText = document.getElementById('cke-response').value;
    editor.insertHtml(`<p>${responseText}</p>`);
    var dialog = CKEDITOR.dialog.getCurrent();
    dialog.hide();
}