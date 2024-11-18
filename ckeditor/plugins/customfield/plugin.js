/*
 Selects list from account

 */

CKEDITOR.plugins.add('customfield', {
    icons: 'customfield',
    init: function (editor) {
        editor.addCommand('insertCustomfield', new CKEDITOR.dialogCommand('custFieldDialog'));

        editor.ui.addButton('CustomField', {
            label: 'Custom Field',
            command: 'insertCustomfield',
            toolbar: 'others, 100'
        });
        CKEDITOR.dialog.add('custFieldDialog', this.path + 'dialogs/customfield.js');

        editor.on('dialogShow', function (e) {
            var dialog;
            dialog = e.data;
            if (dialog.getName() === 'custFieldDialog') {
                var listdata = '<option value="0">--Select List --</option>';
                $.ajax({
                    type: 'GET',
                    url: '/email/insertcustomfieldjson.php',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        var json;
                        json = $.parseJSON(JSON.stringify(data));
                        $.each(json, function (k, value) {
                            listdata = listdata + '<option value="' + value.listId + '">' + value.title + '</option>';
                        });

                        //append to select
                        return $('#custList').html(listdata);

                    }
                });

                var getlistId = $('#custList'); //get the id of the list select


                $(getlistId).on('change', function (e) {
                    var id_list = $(this).val(),
                        cTime = new Date(),
                        cField;
                    var urlField = "/email/insertcustomfieldjson.php?listid=" + id_list + "&t=" + cTime.getTime();

                    //empty on change
                    $('#custField').empty();

                    $.ajax({
                        type: 'GET',
                        url: urlField,
                        cache: false,
                        dataType: 'json',
                        success: function (data) {
                            var json;
                            json = $.parseJSON(JSON.stringify(data));
                            $.each(json, function (k, value) {
                                cField = cField + '<option value="' + value.name + '">' + value.name + '</option>';
                            });
                            //append to select
                            return $('#custField').html(cField);

                        }
                    });

                });
                //add the custom field on select.
                $('#custField').on('change', function (e) {
                    var fieldValue = $(this).val();
                    CKEDITOR.tools.customfieldInsert(fieldValue);
                });


            }
        });

        CKEDITOR.tools.customfieldInsert = function (event) {
            var dialog, html;
            editor = CKEDITOR.currentInstance;
            dialog = CKEDITOR.dialog.getCurrent();
            html = '<#' + event + '#>';
            editor.insertHtml(html.trim());
            dialog.hide();
            event.preventDefault();
        };

    }

});

