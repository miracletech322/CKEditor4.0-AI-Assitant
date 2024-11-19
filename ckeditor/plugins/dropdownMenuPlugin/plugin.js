// CKEDITOR.plugins.add('dropdownMenuPlugin', {
//     icons: 'dropdownmenu',
//     init: function (editor) {
//         editor.ui.add('DropdownMenu', CKEDITOR.UI_PANELBUTTON, {
//             label: 'Options',
//             title: 'Options',
//             toolbar: 'others, 210',
//             panel: {
//                 css: 'ckeditor/plugins/dropdownMenuPlugin/test.css',
//                 attributes: { role: 'dropdown', 'aria-label': 'Options' }
//             },
//             onBlock: function (panel, block) {
//                 block.element.setHtml('<ul class="cke_menu_list"></ul>');
//                 const menuList = block.element.getFirst();

//                 // Create the menus
//                 const menus = [
//                     {
//                         label: 'Change Tone',
//                         items: [
//                             { label: 'Direct', command: 'directTone' },
//                             { label: 'Casual', command: 'casualTone' }
//                         ]
//                     },
//                     {
//                         label: 'Change Style',
//                         items: [
//                             { label: 'Business', command: 'businessStyle' },
//                             { label: 'Legal', command: 'legalStyle' }
//                         ]
//                     },
//                     {
//                         label: 'Translate',
//                         items: [
//                             { label: 'English', command: 'translateEnglish' },
//                             { label: 'Spanish', command: 'translateSpanish' },
//                             { label: 'French', command: 'translateFrench' }
//                         ]
//                     }
//                 ];

//                 // Create the dropdown structure with submenus
//                 menus.forEach(menu => {
//                     const mainItem = CKEDITOR.dom.element.createFromHtml(`<li class="cke_menu_item">${menu.label}</li>`);
//                     const submenu = CKEDITOR.dom.element.createFromHtml('<ul class="cke_submenu"></ul>');

//                     menu.items.forEach(subItem => {
//                         const subMenuItem = CKEDITOR.dom.element.createFromHtml(`<li class="cke_menu_item">${subItem.label}</li>`);
//                         submenu.append(subMenuItem);

//                         // Add click event to submenu items
//                         subMenuItem.on('click', () => {
//                             editor.execCommand(subItem.command);
//                         });
//                     });

//                     mainItem.append(submenu);
//                     menuList.append(mainItem);
//                 });
//             }
//         });

//         // Register commands for each submenu item
//         editor.addCommand('directTone', {
//             exec: function () { alert('Changed tone to Direct'); }
//         });
//         editor.addCommand('casualTone', {
//             exec: function () { alert('Changed tone to Casual'); }
//         });
//         editor.addCommand('businessStyle', {
//             exec: function () { alert('Changed style to Business'); }
//         });
//         editor.addCommand('legalStyle', {
//             exec: function () { alert('Changed style to Legal'); }
//         });
//         editor.addCommand('translateEnglish', {
//             exec: function () { alert('Translate to English'); }
//         });
//         editor.addCommand('translateSpanish', {
//             exec: function () { alert('Translate to Spanish'); }
//         });
//         editor.addCommand('translateFrench', {
//             exec: function () { alert('Translate to French'); }
//         });
//     }
// });
let cke_credits = 0;
let cke_aiCmdType;
let cke_aiTrigger;

CKEDITOR.plugins.add('dropdownMenuPlugin', {
    requires: ['richcombo'],
    init: function (editor) {
        // Array of strings to choose from that'll be inserted into the editor
        var strings = [
            ['@@Tone::displayList(Direct)@@', 'Direct', 'directTone'],
            ['@@Tone::displayList(Casual)@@', 'Casual', 'casualTone'],

            ['@@Style::displayList(Business)@@', 'Business', 'businessStyle'],
            ['@@Style::displayList(Legal)@@', 'Legal', 'legalStyle'],

            ['@@Translate::displayList(English)@@', 'English', 'translateEnglish'],
            ['@@Translate::displayList(Spanish)@@', 'Spanish', 'translateSpanish'],
            ['@@Translate::displayList(French)@@', 'French', 'translateFrench'],
        ];

        // Add the menu to the editor
        editor.ui.addRichCombo('DropdownMenu', {
            label: 'AI Commands',
            title: 'AI Commands',
            voiceLabel: 'AI Commands',
            className: 'cke_format',
            multiSelect: false,
            panel: {
                css: [editor.config.contentsCss, CKEDITOR.skin.getPath('editor')],
                voiceLabel: editor.lang.panelVoiceLabel,
            },

            init: function () {
                this.startGroup("Change Tone");
                for (var i = 0; i < strings.length; i++) {
                    if (strings[i][2].indexOf("Tone") != -1) {
                        this.add(strings[i][0], strings[i][1], strings[i][2]);
                    }
                }

                this.startGroup("Change Style");
                for (var i = 0; i < strings.length; i++) {
                    if (strings[i][2].indexOf("Style") != -1) {
                        this.add(strings[i][0], strings[i][1], strings[i][2]);
                    }
                }

                this.startGroup("Translate");   
                for (var i = 0; i < strings.length; i++) {
                    if (strings[i][2].indexOf("translate") != -1) {
                        this.add(strings[i][0], strings[i][1], strings[i][2]);
                    }
                }
            },

            onClick: function (value) {
                // Find the display name of the clicked item
                for (var i = 0; i < strings.length; i++) {
                    if (strings[i][0] === value) {
                        // Show an alert with the item text
                        cke_aiTrigger = true;
                        cke_aiCmdType = strings[i][2];

                        const event = new Event('click');
                        document.getElementById("cke_66").dispatchEvent(event);
                        break;
                    }
                }

                // Insert the value into the editor
                editor.focus();
                editor.fire('saveSnapshot');
                // editor.insertHtml(value);
                editor.fire('saveSnapshot');
            }
        });
    }
});