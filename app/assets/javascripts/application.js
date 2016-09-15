//= require jquery
//= require bootstrap
//= require jquery_ujs
//= require fullcalendar.min.js
//= require jquery.prettyPhoto.js

//= require raphael-min
//= require morris.min

//= require excanvas.min 
//= require jquery.flot 
//= require jquery.flot.resize 
//= require jquery.flot.pie 
//= require jquery.flot.stack

//= require jquery.noty.js
//= require themes/default
//= require layouts/bottom
//= require layouts/topRight
//= require layouts/top

//= require moment.min
//= require daterangepicker
//= require sparklines
//= require jquery.gritter.min
//= require jquery.cleditor.min
//= require bootstrap-datetimepicker.min
//= require jquery.slimscroll.min
//= require bootstrap-switch.min
//= require filter
//= require custom
//= require charts

//= require tinymce/tinymce.min

//= require jquery.validationEngine-en
//= require jquery.validationEngine

//= require datatables/js/jquery.dataTables
$(".validate").validationEngine();



tinymce.init({
    selector: ".asdasdasd",
    theme: "modern",
    plugins: [
         "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
         "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
         "save table contextmenu directionality emoticons template paste textcolor"
    ],
	setup: function (editor) {
        editor.on('change', function () {
            tinymce.triggerSave();
        });
    },
	convert_urls: false,
    toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

        menubar: false,
        toolbar_items_size: 'small',

        style_formats: [
                {title: 'Bold text', inline: 'b'},
                {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
                {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
                {title: 'Example 1', inline: 'span', classes: 'example1'},
                {title: 'Example 2', inline: 'span', classes: 'example2'},
                {title: 'Table styles'},
                {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
        ]

      /*  templates: [
                {title: 'Test template 1', content: 'Test 1'},
                {title: 'Test template 2', content: 'Test 2'}
        ]*/
});

