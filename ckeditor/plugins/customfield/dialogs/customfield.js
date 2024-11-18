CKEDITOR.dialog.add( 'custFieldDialog', function( editor ) {
 return {
        title: 'Custom Fields',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'cust-field',
                label: 'Add Custom Field',
                elements: [
                    {
                        type: 'html',
                        id: 'acctList',
                        html: 'Select List'
                    }, {
                        type: 'html',
                        id: 'selectBoxList',
                        html:'<select class="cke_dialog_ui_input_select" id="custList"><option value="0" >Select List</option></select>'
                    },
                    {
                        type: 'html',
                        id: 'acctCustomField',
                        html: 'Custom Field'
                    }, {
                        type: 'html',
                        id: 'selectBoxField',
                        html:'<select class="cke_dialog_ui_input_select" id="custField"></select>'
                    }
                ]
            }
        ],
    buttons: [ CKEDITOR.dialog.cancelButton]
    };
});
