function loadForm(frm, data){
    frm = $(frm).get(0);
    if ( frm.tagName != 'FORM' ) return false;
    var obj;
    $.each(data, function (k) {
        obj = $(frm).find("[name=" + k + "]").get(0);
        if (obj == undefined) return true;
        if (obj.tagName == 'INPUT') {
            var type = $(obj).attr('type');
            if (type == "checkbox") {
                if (data[k]) $(obj).attr('checked', true);
                else $(obj).attr('checked', false);
            } else $(obj).val(data[k]);
        }
        if (obj.tagName == 'SELECT') {
            $(obj).val(data[k]);
        }
        if ($(obj).hasClass("dt-date")) {
            var val = data[k];
            val = intDateParse(obj, val);
            $(obj).val(val);
        }
        if (obj.tagName == 'TEXTAREA') {
            $(obj).val("");
            $(obj).val(data[k]);
        }
    });		
}

// Declaramos el objeto Global validate
validate = {};

validate.filters = {};
validate.filters.email = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

validate.validateComponent = function (frm, ctrl) {
    var value = $(ctrl).val();
    if (value == '') return false;
    if ($(ctrl).hasClass("nowhitespaces") && $.trim(value) == '') return false;
    if ($(ctrl).filter('[min]')) {
        if ($(ctrl).filter(".autocomplete.combobox").length > 0) {
            value = $(frm).find("input[name=" + $(ctrl).attr("val") + "]").val();
        }
        if ($(ctrl).attr("min") > value) return false;
    }
    if ($(ctrl).hasClass("email") && !value.match(validate.filters.email)) return false;
    return true;
};

validate.validateForm = function(frm){
    var controls = $(frm).find("input[type=password],input[type=text],textarea,select,input[type=checkbox]");	
    // Solo actuamos sobre los que deben ser validados ( class required )
    controls = $(controls).filter(".required");
    //Asumimos que no hay error
    var isValid = true;
    $(frm).removeClass("error");
    $(controls).removeClass("error");
    $(frm).find("div.errormessage").hide();
    $(controls).each(function(){
        //Validamos el presente control
        var control = this;
        if (!validate.validateComponent(frm,control) ){
            isValid = false;
            $(control).addClass("error");
            $(frm).find("div.errormessage[for="+$(control).attr("name")+"]").show();
        }
    });
    if ( isValid == false ) $(frm).addClass("error");
    return isValid;
};

$(document).ready(function () {
    // Evitamos el molesto autocomplete del browser
    $("form").attr("autocomplete", "off");
    $("form.validate").each(function () {
        //$(this).validate();
        $(this).validationEngine();
    });
    $("form.ajax").bind('submit', function (e) {
        e.preventDefault();
                
        var frm = this;
        if (typeof (CKEDITOR) == 'object') {
            for (instance in CKEDITOR.instances) {
                CKEDITOR.instances[instance].updateElement();
            }
        }

        // pplugin validateEngine
        if ($(frm).hasClass("validate")) {            
            if (!$(frm).validationEngine('validate')) return false;
        }

        // plugin validate!
        /*if ($(frm).hasClass("validate")) {
        if (!$(frm).valid()) return false;
        }*/
        if ($(frm).hasClass("validable")) {
            if (!validate.validateForm(frm)) return false;
        }
        $(frm).find("textarea").each(function () {

        });
        
        var noWaitDialog = $(this).attr("noWaitDialog");
        if(noWaitDialog == undefined) noWaitDialog = "false";
        noWaitDialog = noWaitDialog == "false" ? false : true;
        
        var url = $(this).attr("action");
        var dataString = $(this).serialize();
        var dataType = $(this).attr("dataType") || 'json';

        var busy = $(frm).attr('busy');
        if (busy == 'true') return false;
        
        $(frm).attr('busy', 'true');
        $(frm).trigger('start', dataString);
        getData({ url: url, data: dataString, dataType: dataType, noWaitDialog:noWaitDialog
        }, function (response) {
            $(frm).trigger('success', response);
            $(frm).attr('busy', 'false');
        });
    });

    /**
    * Creacion de componente de upload file
    * input: nombre del campo donde se coloca la URL del archivo
    * limit: indica la cantidad de archivos que es permitido subir por formulario, undefined para ilimitado
    * action: indica la URL donde se procesa la carga de archivos
    * title: el texto que se carga en el boton de subir
    */
    $("form .fileuploader").each(function () {
        var fu = this;
        var inputname = $(fu).attr("input") || 'file';
        var limit = $(fu).attr("limit");
        var action = $(fu).attr("action");
        var button = $(fu).attr("button");
        var backgroundcolor = $(fu).attr("background-color") || "#800";
        if (action == undefined) throw "Not defined action URL at fileuploader " + $(fu).attr("id");
        var divUploadList = document.createElement("div");
        $(divUploadList).addClass("uploadList");
        $(divUploadList).addClass("dinamic");

        $(fu).data('addFile', function (response) {
            var div = document.createElement("div");
            $(div).css("position", "relative");
            var inp = document.createElement("input");
            $(inp).attr("type", "hidden");
            $(inp).attr("name", inputname);
            $(inp).attr("value", response.filename);

            var del = document.createElement("a");
            $(del).attr("href", "#");
            $(del).text("X");
            $(del).css("vertical-align", "top");
            $(del).attr("title", "Remover");

            $(del).bind('click', function (e) {
                e.preventDefault();
                $(div).remove();
            });
            $(div).append(inp);
            if ($(fu).hasClass("thumbnail")) { //Mostrar thumbnails
                $(div).addClass("left");
                $(div).addClass("dinamic");
                var img = document.createElement("img");
                $(img).addClass("thumbnail");
                $(img).addClass("left");
                var thumbnail_uri = $(fu).attr("thumbnail");
                $(img).attr("src", eval(thumbnail_uri));
                $(div).append(img);
                $(div).append(del);
                $(del).css("top", "5px");
                $(del).css("float:right");
            } else {
                var file = document.createElement("a");
                $(file).attr("href", response.uri);
                var span = document.createElement("span");
                $(span).css("display", "inline-block");
                $(span).css("width", 200);
                $(span).css("overflow", "hidden");
                $(span).text(response.filename);
                $(file).append(span);
                $(file).css("width", 200);
                $(file).css("text-overflow", "ellipsis");
                $(div).append(file);
                $(div).append("&nbsp;&nbsp;&nbsp;&nbsp;");
                $(div).append(del);
            }

            $(divUploadList).append(div);
            return div;
        });

        if ($(fu).hasClass("thumbnail")) $(divUploadList).addClass("thumbnail");

        var dlgWait = document.createElement("div");
        $(dlgWait).addClass("dialog")
        .append('<p style="width: 300px;">Espere un momento por favor ...</p>')
        .attr("id", "dlgWait");

        $("div#dlgWait").remove();
        $(document).append(dlgWait);
        dialog(dlgWait);
        $(dlgWait).parent().find(".ui-dialog-titlebar").hide();

        new qq.FileUploader({
            element: fu,
            //button: 'Cargar',
            action: $(fu).attr("action"),
            debug: true,
            buttonTitle: button,
            inputName: inputname,
            onSubmit: function (id, filename) {
                var lis = $(divUploadList).find(">div");
                if (limit != undefined && $(lis).length >= limit) {
                    $(fu).trigger("error", {
                        codeError: 'LIMITEXPECTED'
                    });
                    return false;
                }
                // if ( typeof($.blockUI) == 'function' ) $.blockUI();
                $(dlgWait).dialog('open');
            },
            onComplete: function (id, filename, response) {
                // var li = $(fu).find(".qq-upload-list li:last");//.eq(id);
                $(dlgWait).dialog('close');
                if (response.success == false) {
                    msgBox(response.errormessage);
                    return false;
                }
                var fn = $(fu).data("addFile");
                var div = fn(response);
                // if ( typeof($.unblockUI) == 'function' ) $.unblockUI();
                $(fu).trigger('onComplete', {
                    element: div,
                    filename: filename,
                    response: response
                });
            }
        });

        $(fu).find(".qq-upload-button").css("background-color", backgroundcolor);
        $(fu).find(".qq-upload-list").remove();
        $(fu).find(".qq-uploader").append(divUploadList);
    });

    $(document).on('click', 'form .fileuploader .qq-upload-delete', function (e) {
        e.preventDefault();
        var li = $(this).parents("li").eq(0).remove();
    });
    
    if (typeof (CKEDITOR) == 'object') {
        $("form textarea.rich").each(function () {
            var ta = this;
            CKEDITOR.replace(ta, {
                toolbar:
                [
                ['Source'],
                ['Bold', 'Italic', 'Underline'],
                ['NumberedList', 'BulletedList'],
                ['Image', 'Flash', 'Table'],
                ['Format', 'Font', 'FontSize'],
                ['TextColor', 'BGColor']
                ],
                filebrowserUploadUrl: $(ta).attr("uploadURL")
            });
        });
    }
});