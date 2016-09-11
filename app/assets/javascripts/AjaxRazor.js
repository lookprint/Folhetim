// jQuery AjaxRazor
//
// Biblioteca para utilizar o Ajax do Razor
//
//No Razor colocar as seguintes propriedades
//OnSuccess = Mensagem de sucesso
//UpdateTargetId = Div que será atualizada
//OnBegin = Ação a executar ao iniciar o Ajax ( ex.: ListarExercicios ) Sem o ()
//OnComplete = Ação a executar ao terminar o Ajax ( ex.: ListarExercicios ) Sem o ()
//OnFailure = Mensagem de erro
//Confirm = Se precisar de confirmação antes de executar o Ajax ( ex. exclusão ou alteração )
//method = Metodo do Ajax ( GET, POST )
//action = URL do Ajax.
//
jQuery(document).ready(function () {
    jQuery('body').on('submit', 'form[data-ajax=true]', function () {
        SubmitAjaxRazor(this);
        return false;
    });

    jQuery('body').on('click', 'table[click=true] tbody tr', function () {
        var objTable = jQuery(this).parent().parent();
        var objLinha = jQuery(this).children('td').children('span');
        AjaxRazorTable(objTable, objLinha);
        return false;
    });

    jQuery('body').on('click', 'a[data-ajax=true]', function () {
        if (jQuery(this).attr("disabled") == "disabled") {
            return false;
        }
        else {
            var bSubmit = jQuery(this).attr("submit");
            if (bSubmit) {
                var objForm = jQuery(this).closest('form[data-ajax=true]')[0];
                SubmitAjaxRazor(objForm);
            }
            else {
                LinkAjaxRazor(this);
            }
        }
        return false;
    });
});



function AjaxRazor(objAjax) {
    objAjax.Contenttype = 'application/x-www-form-urlencoded; charset=UTF-8';
    ExecutaAjax(objAjax);
}

function getFunction(strFunction, argumentos) {
    var fn = window, parts = (strFunction || "").split(".");
    while (fn && parts.length) {
        fn = fn[parts.shift()];
    }
    if (typeof (fn) === "function") {
        return fn;
    }
    argumentos.push(strFunction);
    return Function.constructor.apply(null, argumentos);
}

function ExecutaAjax(objAjax) {
    jQuery.ajax({
        url: objAjax.url,
        type: objAjax.type,
        data: objAjax.data,
        contentType: objAjax.Contenttype,
        beforeSend: function () {
            if (objAjax.Loading == 'true' || objAjax.Loading == null) {
                jQuery('body').addClass("loading");
            }
            if (objAjax.Inicio != null) {
                getFunction(objAjax.Inicio, ["xhr", "status"]).apply(this, arguments);
            }
        },
        success: function (objRetorno) {
            if (objAjax.targetUpdate != null) {
                jQuery(objAjax.targetUpdate).empty();
                jQuery(objAjax.targetUpdate).html(objRetorno).fadeIn();
                CarregarControles(objAjax.targetUpdate);
                //Seta o focus no primeiro componente do DIV
                jQuery(objAjax.targetUpdate + ':first *:input[type!=hidden]:first').focus();
            }
            else if (objAjax.FimSucess != null) {
                getFunction(objAjax.FimSucess + "(" + objRetorno + ")", ["xhr", "status"]).apply(this, arguments);
            }
            if (objAjax.MsgSucesso != null) {
                jAlert(objAjax.MsgSucesso, 'EVO');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {            
            if (XMLHttpRequest.status == 500 && XMLHttpRequest.responseText != "")
            {
                jErro(XMLHttpRequest.responseText);                
            }            
            else if (objAjax.MsgErro != null) {
                jErro(objAjax.MsgErro, 'EVO');
            }
        },
        complete: function () {
            if (objAjax.Fim != null) {
                getFunction(objAjax.Fim, ["xhr", "status"]).apply(this, arguments);
            }
            if (jQuery('body').hasClass("loading")) {
                jQuery('body').removeClass("loading");
            }
        }
    });
}

function ExecutaAjaxImprimir(objAjax) {
    jQuery.ajax({
        url: objAjax.url,
        type: "post",
        data: objAjax.data,
        dataType: "html",
        beforeSend: function () {
            if (objAjax.Loading == 'true' || objAjax.Loading == null) {
                jQuery('body').addClass("loading");
            }
            if (objAjax.Inicio != null) {
                getFunction(objAjax.Inicio, ["xhr", "status"]).apply(this, arguments);
            }
        },
        success: function (objRetorno) {
            jQuery("#iImpressao").attr('src', objRetorno);
            jQuery('#ModalImpressao').modal("show");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (objAjax.MsgErro != null) {
                jAlert(objAjax.MsgErro, 'EVO');
            }
        },
        complete: function () {
            if (objAjax.Fim != null) {
                getFunction(objAjax.Fim, ["xhr", "status"]).apply(this, arguments);
            }
            if (jQuery('body').hasClass("loading")) {
                jQuery('body').removeClass("loading");
            }
        }
    });
}




function SubmitAjaxRazor(objForm) {
    var objAjax = new Object();
    objAjax.isAjax = jQuery(objForm).attr('data-ajax');
    if (objAjax.isAjax) {
        //Carregar o objeto
        objAjax.url = jQuery(objForm).attr("action");
        objAjax.FimSucess = jQuery(objForm).attr("FimSucess");
        objAjax.type = jQuery(objForm).attr("method");;
        objAjax.data = jQuery(objForm).serialize();
        objAjax.targetUpdate = jQuery(objForm).attr('data-ajax-update');
        objAjax.MsgConfirmacao = jQuery(objForm).attr('data-ajax-confirm');
        objAjax.MsgErro = jQuery(objForm).attr('data-ajax-failure');
        objAjax.MsgSucesso = jQuery(objForm).attr('data-ajax-success');
        objAjax.Inicio = jQuery(objForm).attr('data-ajax-begin');
        objAjax.Fim = jQuery(objForm).attr('data-ajax-complete');
        objAjax.Loading = jQuery(objForm).attr('data-ajax-loading');
        objAjax.Contenttype = 'application/x-www-form-urlencoded; charset=UTF-8';

        if (objAjax.MsgConfirmacao != null) {
            var strConfirmacao = objAjax.MsgConfirmacao.split('|');
            var Msg = strConfirmacao[0];
            var btnOk = null;
            var btnCancelar = null;
            if (strConfirmacao.length > 1) {
                btnOk = strConfirmacao[1];
            }
            if (strConfirmacao.length > 2) {
                btnCancelar = strConfirmacao[2];
            }

            jConfirma(Msg, 'EVO', btnOk, btnCancelar, function (objRetorno) {
                if (objRetorno) {
                    ExecutaAjax(objAjax);
                }
            });
        }
        else {
            ExecutaAjax(objAjax);
        }
    }
}
function LinkAjaxRazor(objLink) {
    var objAjax = new Object();
    objAjax.isAjax = jQuery(objLink).attr('data-ajax');
    if (objAjax.isAjax) {
        //Carregar o objeto        
        objAjax.url = jQuery(objLink).attr("href");
        objAjax.type = "post";
        objAjax.FimSucess = jQuery(objLink).attr("FimSucess");
        objAjax.targetUpdate = jQuery(objLink).attr('data-ajax-update');
        objAjax.MsgConfirmacao = jQuery(objLink).attr('data-ajax-confirm');
        objAjax.MsgErro = jQuery(objLink).attr('data-ajax-failure');
        objAjax.MsgSucesso = jQuery(objLink).attr('data-ajax-success');
        objAjax.Inicio = jQuery(objLink).attr('data-ajax-begin');
        objAjax.Fim = jQuery(objLink).attr('data-ajax-complete');
        objAjax.Loading = jQuery(objLink).attr('data-ajax-loading');
        objAjax.Contenttype = 'application/x-www-form-urlencoded; charset=UTF-8';

        if (objAjax.MsgConfirmacao != null) {
            var strConfirmacao = objAjax.MsgConfirmacao.split('|');
            var Msg = strConfirmacao[0];
            var btnOk = null;
            var btnCancelar = null;
            if (strConfirmacao.length > 1) {
                btnOk = strConfirmacao[1];
            }
            if (strConfirmacao.length > 2) {
                btnCancelar = strConfirmacao[2];
            }

            jConfirma(Msg, 'EVO', btnOk, btnCancelar, function (objRetorno) {
                if (objRetorno) {
                    ExecutaAjax(objAjax);
                }
            });
        }
        else {
            ExecutaAjax(objAjax);
        }
    }
}

function AjaxRazorTable(objTable, objItem) {
    var objAjax = new Object();
    //Carregar o objeto
    objAjax.url = jQuery(objTable).attr("Action") + jQuery(objItem).attr("id");
    objAjax.type = "post";
    objAjax.targetUpdate = jQuery(objTable).attr('TargetUpdate');
    objAjax.Contenttype = 'application/x-www-form-urlencoded; charset=UTF-8';
    ExecutaAjax(objAjax);
}

function ClickModal(e) {
    e.preventDefault();
    var dataItem = this.dataItem(jQuery(e.currentTarget).closest("tr"));
    var click = jQuery(e.currentTarget);
    click.Data = JSON.stringify(dataItem);
    SubmitKendo(click);
}



function SubmitKendo(objForm) {
    var objAjax = new Object();
    //Carregar o objeto
    objAjax.url = jQuery(objForm).attr("action");
    objAjax.FimSucess = jQuery(objForm).attr("FimSucess");
    objAjax.type = "POST";
    objAjax.data = objForm.Data;
    objAjax.targetUpdate = jQuery(objForm).attr('TargetUpdate');
    objAjax.MsgConfirmacao = jQuery(objForm).attr('Confirm');
    objAjax.MsgErro = jQuery(objForm).attr('Erro');
    objAjax.MsgSucesso = jQuery(objForm).attr('Sucesso');
    objAjax.Inicio = jQuery(objForm).attr('Inicio');
    objAjax.Fim = jQuery(objForm).attr('Fim');
    objAjax.Loading = jQuery(objForm).attr('Loading');
    objAjax.Contenttype = "application/json";

    if (objAjax.MsgConfirmacao != null) {
        var strConfirmacao = objAjax.MsgConfirmacao.split('|');
        var Msg = strConfirmacao[0];
        var btnOk = null;
        var btnCancelar = null;
        if (strConfirmacao.length > 1) {
            btnOk = strConfirmacao[1];
        }
        if (strConfirmacao.length > 2) {
            btnCancelar = strConfirmacao[2];
        }

        jConfirma(Msg, 'EVO', btnOk, btnCancelar, function (objRetorno) {
            if (objRetorno) {
                ExecutaAjax(objAjax);
            }
        });
    }
    else {
        ExecutaAjax(objAjax);
    }
}