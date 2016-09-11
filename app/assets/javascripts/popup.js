/* 
 * Funcoes popup 
 * 27/12/2015 - 08:37
 * Patrick C. Magalhaes
 */

/*
 * popup de 2 campos [descrição e situação]
 */
function alterarPopup(id, descricao, padrao) {
    $('#popId').val(id);
    $('#popDescricao').val(descricao);
    $('#popPadrao').val(padrao);
}

function limparPopup() {
    $('#popId').val('');
    $('#popDescricao').val('');
    $('#popPadrao').val('N');
}
//###########################
function PopupBeneficio(acao, id, status, descricao, fornecedor, valor, tipoCobranca, padrao) {
    form = parent['document']['forms'][0];
    if (acao === 'get') {
        form['popId']['value'] = id;
        form['popStatus']['value'] = status;
        form['popPadrao']['value'] = padrao;
        form['popDescricao']['value'] = descricao;
        form['popFornecedor']['value'] = fornecedor;
        form['popTipo_cobranca']['value'] = tipoCobranca;
        form['popValor']['value'] = valor;
    } else if (acao === 'limpar') {
        form['popId']['value'] = '';
        form['popStatus']['value'] = 'A';
        form['popDescricao']['value'] = '';
        form['popFornecedor']['value'] = '0';
        form['popTipo_cobranca']['value'] = 'R';
        form['popValor']['value'] = '';
         form['popPadrao']['value'] = 'N';
    }
}


function NovaJanelaPopup(pagina, nome, w, h, scroll) {
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    TopPosition = 0;
    if (w === 'todo') {
        w = window.screen.availWidth;
    }
    settings = 'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',resizable'
    win = window.open(pagina, nome, settings);
}

function marcardesmarcar() {
    if ($("#todos").prop("checked")) {
        $('.marcar').each(
                function () {
                    $(this).prop("checked", true);
                }
        );
    } else {
        $('.marcar').each(
                function () {
                    $(this).prop("checked", false);
                }
        );
    }
}

function carregarParentesco(idBeneficio) {
    $.ajax({
        type: 'POST',
        data: {'id': idBeneficio},
        dataType: 'json',
        url: '../ajax/carregarParentesco.php',
        success: function (json) {
            //limpar
            $('.marcar').each(
                    function () {
                        $(this).prop("checked", false);
                    });
            //Carregar Novos
            $.each(json, function (key, value) {
                $('#parentesco' + value).prop("checked", true);
            });

        }

    });
}

