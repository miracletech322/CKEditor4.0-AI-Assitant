/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

    //needed plugins and settings
    config.language = 'en';
    // config.removePlugins = 'flash,forms,about,smiley,uploadimage,balloonpanel,uploadfile';
    config.removePlugins = 'flash,forms,about,smiley,balloonpanel';
    config.height = 400;
    config.autoGrow_maxHeight = 600;
    config.autoGrow_minHeight = 400;
    config.fullPage = true;
    //config.docType='<!DOCTYPE html>';
    config.allowedContent = true;
    config.forceSimpleAmpersand = true;

    config.autoGrow_bottomSpace = 50;
    config.pasteFromWordPromptCleanup = true;
    //config.allowedContent = 'source[!src]';
    config.disallowedContent = 'script; *[on*]';
    config.skin = 'moonocolor';
    //config.scayt_autoStartup = true;
    //domain for imagehosting
    config.imageBrowser_listUrl = "/email/insertimagehostingjson.php";
    config.imageUploadUrl = "/email/addimage.php?type=editor&action=bulk";

    //config for social buttons
    config.strinsert_button_label = 'Social';
    config.strinsert_button_title = 'Social Sharing';
    config.strinsert_button_voice = 'Social Sharing';
    config.strinsert_strings =	 [
        {'name': 'Facebook Share', 'value': '{FACEBOOK}', 'label': 'Insert Social Share Facebook'},
        {'name': 'Twitter Share', 'value': '{TWITTER}', 'label': 'Insert Social Share Twitter'},
        {'name': 'LinkedIn Share', 'value': '{LINKEDIN}', 'label': 'Insert Social Share LinkedIn'},
        {'name': 'Forward to friend', 'value': '{FORWARDFRIEND}', 'label': 'Insert Forward to a Friend'},
        {'name': 'Other'},
        {'name': 'View as web', 'value': '{VIEWWEBPAGE}', 'label': 'Insert View as WebPage'}

    ];

    //sourcedialog,sourcearea'document','CommentSelectedRange', 'UncommentSelectedRange'simple-image-browser,
    // config.extraPlugins = 'codemirror,autogrow,customfield,socialbuttons,docprops,imagebrowser';
    config.extraPlugins = 'aiAssistant,dropdownMenuPlugin,codemirror,autogrow,customfield,socialbuttons,docprops,uploadimage,imagebrowser';

    //new fonts
    config.contentsCss = "@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Archivo|Archivo+Black|Cardo|Chivo|Crimson+Text|Judson|Lato|Lora|Montserrat|Open+Sans|Oswald|Playfair+Display|Prata|Quicksand|Roboto');";

    // config.font_names = 'Source Sans Pro Regular/SourceSansPro-Regular;' + config.font_names;
    config.font_names = 'Crimson Text/Crimson Text, serif;' + config.font_names;
    config.font_names = 'Oswald/Oswald, sans-serif;' + config.font_names;
    config.font_names = 'Cardo/Cardo, serif;' + config.font_names;
    config.font_names = 'Quicksand/Quicksand, sans-serif;' + config.font_names;
    config.font_names = 'Archivo Black/Archivo Black, sans-serif;' + config.font_names;
    config.font_names = 'Judson/Judson, serif;' + config.font_names;
    config.font_names = 'Abril Fatface/Abril Fatface, cursive;' + config.font_names;
    config.font_names = 'Roboto/Roboto, sans-serif;' + config.font_names;
    config.font_names = 'Archivo/Archivo, sans-serif;' + config.font_names;
    config.font_names = 'Open Sans/Open Sans, sans-serif;' + config.font_names;
    config.font_names = 'Montserrat/Montserrat, sans-serif;' + config.font_names;
    config.font_names = 'Prata/Prata, serif;' + config.font_names;
    config.font_names = 'Lato/Lato, sans-serif;' + config.font_names;
    config.font_names = 'Lora/Lora, serif;' + config.font_names;
    config.font_names = 'Playfair Display/Playfair Display, serif;' + config.font_names;
    config.font_names = 'Chivo/Chivo, sans-serif;' + config.font_names;

    //toolbar
    config.toolbar = [
        { name: 'document', groups: [ 'mode','document' ,'doctools' ], items: [ 'Source', '-', 'Preview'  , '-','Templates','-','DocProps'] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
        { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', '-', 'RemoveFormat' ] },
        { name: 'paragraph', groups: [ 'list','indent','align', 'blocks'], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote','-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
        { name: 'insert', items: [ 'Image', 'Table', 'SpecialChar' ] },
        { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
        { name: 'others', items: [ 'DropdownMenu','aiAssistant', 'socialbuttons'  ] }

    ];

};

CKEDITOR.on('instanceReady', function(ev) {

    // Ends self closing tags the HTML4 way, like <br>.
    ev.editor.dataProcessor.htmlFilter.addRules({
        elements: {
            $: function(element) {
                // Output dimensions of images as width and height
                if (element.name === 'img') {
                    var style = element.attributes.style;

                    if (style) {
                        // Get the width from the style.
                        var match = /(?:^|\s)width\s*:\s*(\d+)px/i.exec(style),
                            width = match && match[1];

                        // Get the height from the style.
                        match = /(?:^|\s)height\s*:\s*(\d+)px/i.exec(style);
                        var height = match && match[1];

                        // Get the float from the style.
                        match = /(?:^|\s)float\s*:\s*(\w+)/i.exec(style);
                        var float = match && match[1];

                        if (width) {
                            element.attributes.style = element.attributes.style.replace(/(?:^|\s)width\s*:\s*(\d+)px;?/i, '');
                            element.attributes.width = width;
                        }

                        if (height) {
                            element.attributes.style = element.attributes.style.replace(/(?:^|\s)height\s*:\s*(\d+)px;?/i, '');
                            element.attributes.height = height;
                        }
                        if (float) {
                            element.attributes.style = element.attributes.style.replace(/(?:^|\s)float\s*:\s*(\w+)/i, '');
                            element.attributes.align = float;
                        }

                    }
                }

                if (!element.attributes.style) delete element.attributes.style;

                return element;
            }
        }
    });
});
