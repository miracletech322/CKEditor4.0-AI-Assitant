/**
*	@credit to Stuart Sillitoe
*/

CKEDITOR.plugins.add('socialbuttons',
{
	requires : ['richcombo'],
	init : function( editor )
	{
		var config = editor.config;

		// Gets the list of insertable strings from the settings.
		var strings = config.strinsert_strings;

		// add the menu to the editor
		editor.ui.addRichCombo('socialbuttons',
		{
			label: 		config.strinsert_button_label,
			title: 		config.strinsert_button_title,
			voiceLabel: config.strinsert_button_voice,
			toolbar: 'insert',
			className: 	'cke_format',
			multiSelect:false,
			panel:
			{
				css: [ editor.config.contentsCss, CKEDITOR.skin.getPath('editor') ],
				voiceLabel: editor.lang.panelVoiceLabel
			},

			init: function()
			{
				var lastgroup = '';
				for(var i=0, len=strings.length; i < len; i++)
				{
					string = strings[i];
					// If there is no value, make a group header using the name.
					if (!string.value) {
						this.startGroup( string.name );
					}
					// If we have a value, we have a string insert row.
					else {
						// If no name provided, use the value for the name.
						if (!string.name) {
							string.name = string.value;
						}
						// If no label provided, use the name for the label.
						if (!string.label) {
							string.label = string.name;
						}
						this.add(string.value, string.name, string.label);
					}
				}
			},

			onClick: function( value )
			{
				editor.focus();
				editor.fire( 'saveSnapshot' );
				editor.insertHtml(value);
				editor.fire( 'saveSnapshot' );
			},

		});
	}
});