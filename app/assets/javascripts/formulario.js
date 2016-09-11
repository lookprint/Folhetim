var cep = {
    buscar: function () {
        var cep = $('#inputCep').val();
        $.ajax({
            type: 'GET',
            data: {'cep': cep},
            dataType: 'json',
            url: 'cep/buscar_cep.php',
            success: function (html) {
                if (html['erro'] == 'N') {
                    $('#rua').val(html['logradouro']);
                    $('#bairro').val(html['bairro']);
                    $('#cidade').val(html['cidade']);
                    $('#estado').val(html['estado']);
                    $('#numero').focus();
                } else {
                    $('#rua').focus();
                }

            }

        });

    },
    buscar_beneficiario: function () {
        var cep = $('#inputCepBenef').val();
        $.ajax({
            type: 'GET',
            data: {'cep': cep},
            dataType: 'json',
            url: 'cep/buscar_cep.php',
            success: function (html) {
                if (html['erro'] == 'N') {
                    $('#ruaBeneficiario').val(html['logradouro']);
                    $('#bairroBeneficiario').val(html['bairro']);
                    $('#cidadeBeneficiario').val(html['cidade']);
                    $('#estadoBeneficiario').val(html['estado']);
                    $('#numeroBeneficiario').focus();
                } else {
                    $('#ruaBeneficiario').focus();
                }

            }

        });

    }
};
var atualizarInput = {
    profissao: function (campo) {
        $.ajax({
            type: "POST",
            url: "ajax/att_select.php",
            data: {'pagina': 'profissao','selecione':'S'},
            dataType: "json",
            success: function (json) {
                var options = "";
                $.each(json, function (key, value) {
                    options += '<option value="' + key + '">' + value + '</option>';
                });
                $('#'+campo+'').html(options);
            }
        });
    },
    vencimento: function () {
        $.ajax({
            type: "POST",
            url: "ajax/att_select.php",
            data: {'pagina': 'vencimento', 'selecione': 'N'},
            dataType: "json",
            success: function (json) {
                var options = "";
                $.each(json, function (key, value) {
                    options += '<option value="' + key + '">Dia ' + value + '</option>';
                });
                $("#vencimento").html(options);
            }
        });
    },
    segmento: function () {
        $.ajax({
            type: "POST",
            url: "ajax/att_select.php",
            data: {'pagina': 'segmento', 'selecione': 'S'},
            dataType: "json",
            success: function (json) {
                var options = "";
                $.each(json, function (key, value) {
                    options += '<option value="' + key + '">' + value + '</option>';
                });
                $("#segmento").html(options);
            }
        });
    },
    beneficio: function (parentesco,id_recebe,id_campoVinculado) {
        $.ajax({
            type: "POST",
            url: "ajax/att_select.php",
            data: {'pagina': 'beneficio', 'selecione': 'N','id_parentesco':parentesco},
            dataType: "json",
            success: function (json) {
                //remover tudo do campo q recebe os beneficios
                $('#'+id_campoVinculado+'')[0].options.length = 0;
                var options = "";
                $.each(json, function (key, value) {
                    options += '<option value="' + key + '">' + value + '</option>';
                });
                $('#'+id_recebe+'').html(options);
                atualizarInput.beneficioVinculado(parentesco,id_campoVinculado);
            }
        });
    },
    beneficioVinculado: function (parentesco,id_campoVinculado) {
        $.ajax({
            type: "POST",
            url: "ajax/att_select.php",
            data: {'pagina': 'beneficioVinculados', 'selecione': 'N','id_parentesco':parentesco},
            dataType: "json",
            success: function (json) {
                var options = "";
                $.each(json, function (key, value) {
                    options += '<option value="' + key + '">' + value + '</option>';
                });
                $('#'+id_campoVinculado+'').html(options);
            }
        });
    }

};
var getBanco = {
    buscarInfo: function(id_banco){
        $.ajax({
            type: 'GET',
            data: {'id': id_banco},
            dataType: 'json',
            url: 'ajax/buscar_banco.php',
            success: function (html) {
                if (html['erro'] == 'N') {
                    $('#agencia').val(html['agencia']);
                    $('#conta').val(html['conta']);
                    $('#carteira').val(html['carteira']);
                } else {
                    $('#agencia').val('');
                    $('#conta').val('');
                    $('#carteira').val('');
                }

            }

        });
    }
};

function validateCPF(field, rules, i, options) {
    var valido = validarCPF(field.val()); //implementar a validação do CPF
    if (!valido) {
        //internacionalização
        return options.allrules.cpf.alertText;
    }

}

function validateCNPJ(field, rules, i, options) {
    var contar = field.val().length;
    if (contar === 11) {
        var valido = validarCPF(field.val()); //implementar a validação do CPF
        if (!valido) {
            //internacionalização
            return options.allrules.cpf.alertText;
        }

    } else if (contar === 14) {
        var valido = validarCNPJ(field.val()); //implementar a validação do CNPJ
        if (!valido) {
            //internacionalização
            return options.allrules.cnpj.alertText;
        }
    } else {
        return options.allrules.cnpjcpf.alertText;
    }



}
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '')
        return false;
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
        return false;
    // Valida 1o digito 
    add = 0;
    for (i = 0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito 
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '')
        return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

function moveRelogio(formp) {
    if(formp===1){
       form = parent['document']['forms'][0]; //popup
    } else {
       form = parent['document']['forms'][1];  
    }
    momentoAtual = new Date();
    hora = momentoAtual.getHours();
    minuto = momentoAtual.getMinutes();
    segundo = momentoAtual.getSeconds();

    str_segundo = new String(segundo);
    if (str_segundo['length'] == 1) {
        segundo = '0' + segundo;
    }
    ;
    str_minuto = new String(minuto);
    if (str_minuto['length'] == 1) {
        minuto = '0' + minuto;
    }
    ;
    str_hora = new String(hora);
    if (str_hora['length'] == 1) {
        hora = '0' + hora;
    }
    ;

    horaImprimivel = hora + ":" + minuto + ":" + segundo;
    form['hora_cd']['value'] = horaImprimivel;

    setTimeout("moveRelogio("+formp+")", 1000);
}



var win = null;
function NovaJanela(pagina, nome, w, h, scroll) {
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    TopPosition = 0;
    if (w === 'todo') {
        w = window.screen.availWidth;
    }
    settings = 'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',resizable'
    win = window.open(pagina, nome, settings);
}
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

function mvalor(v) {
    v = v.replace(/\D/g, "");//Remove tudo o que não é dígito
    v = v.replace(/(\d)(\d{8})$/, "$1.$2");//coloca o ponto dos milhões
    v = v.replace(/(\d)(\d{5})$/, "$1.$2");//coloca o ponto dos milhares    
    v = v.replace(/(\d)(\d{2})$/, "$1,$2");//coloca a virgula antes dos 2 últimos dígitos
    return v;
}

function mporcentagem(v) {
    v = v.replace(/\D/g, "");//Remove tudo o que não é dígito
    v = v.replace(/(\d)(\d{3})$/, "$1.$2");//coloca o ponto 

    return v;
}

function transferirSelect(valor, para) {
    var text = valor.options[valor.selectedIndex].text;
    var value = valor.options[valor.selectedIndex].value;
    var campoAtual = valor['id'];
    //carrega 
    var paraP = document.getElementById(para);
    //configura as opcoes para criacao
    var opt0 = document.createElement("option");
    opt0.value = value;
    opt0.text = text;
    //Trasnfere / Cria
    paraP.add(opt0, paraP.options[0]);
    //Remover do campo 
    $("#" + campoAtual + " option[value='" + value + "']").remove();

}

function prepararBeneficios() {
    var vinculados = document.getElementById("vinculados");
    for (i = 0; i < vinculados.length; i++) {
        //MARCAR COMO SELECIONADO
        vinculados.options[i].selected = true;
        var campoRetorno = $('#receberBeneficios');
        //RETIRAR VIRGULA DO INICIO
        if (i === 0) {
            campoRetorno.val(vinculados.options[i].value);
        } else {
            campoRetorno.val(campoRetorno.val() + ',' + vinculados.options[i].value);
        }
    }
}

function prepararBeneficiosBeneficiarios(){
    var vinculados = document.getElementById("vinculadosBeneficiario");
    for (i = 0; i < vinculados.length; i++) {
        //MARCAR COMO SELECIONADO
        vinculados.options[i].selected = true;
        var campoRetorno = $('#receberBeneficiosBeneficiario');
        //RETIRAR VIRGULA DO INICIO
        if (i === 0) {
            campoRetorno.val(vinculados.options[i].value);
        } else {
            campoRetorno.val(campoRetorno.val() + ',' + vinculados.options[i].value);
        }
    }
}

/*
 * De acordo com o parentesco
 */

function carregarBeneficioBeneficiario(id_parentesco){
    id_parent = document.admin_form.parentescoBeneficiario.value;
    if(id_parent=='' || id_parent=='0'){
       if(id_parentesco !=='' || id_parentesco !=='0' || id_parentesco !== undefined){
          atualizarInput.beneficio(id_parentesco,'beneficiosBeneficiario','vinculadosBeneficiario');
       }
    } else {
         atualizarInput.beneficio(id_parent,'beneficiosBeneficiario','vinculadosBeneficiario');
    }
    
    
}

function alternar_selectBeneficiario(acao) {
    if (acao == 'proprio') {
        $("#form_beneficiario").css("display", "none");
        carregar_ValidateBeneficiario('remover');
    } else {
        $("#form_beneficiario").css("display", "inline");
        carregar_ValidateBeneficiario('carregar');
    }
}

function carregar_ValidateBeneficiario(tipo) {
    if (tipo == 'carregar') {
        document.getElementsByName("nomeBeneficiario")[0].className = 'validate[required] form-control';
        document.getElementsByName("dataNascimentoBeneficiario")[0].className = 'validate[required, custom[date], past[now]] form-control';
        document.getElementsByName("rgBeneficiario")[0].className = 'validate[required, custom[rg]] form-control';
        document.getElementsByName("cpfBeneficiario")[0].className = 'validate[required, funcCall[validateCNPJ]] form-control';
        document.getElementsByName("parentescoBeneficiario")[0].className = 'validate[required] form-control';
        document.getElementsByName("sexoBeneficiario")[0].className = 'validate[required] form-control';
        document.getElementsByName("parentescoBeneficiario")[0].className = 'validate[required] form-control';
        document.getElementsByName("emailBeneficiario")[0].className = 'validate[required, custom[email]] form-control';
        document.getElementsByName("profissaoBeneficiario")[0].className = 'validate[required] form-control';
        document.getElementsByName("estado_civilBeneficiario")[0].className = 'validate[required] form-control';
    } else if (tipo == 'remover') {
        document.getElementsByName("nomeBeneficiario")[0].className = 'form-control';
        document.getElementsByName("dataNascimentoBeneficiario")[0].className = 'validate[custom[date], past[now]] form-control';
        document.getElementsByName("rgBeneficiario")[0].className = 'validate[custom[rg]] form-control';
        document.getElementsByName("cpfBeneficiario")[0].className = 'validate[funcCall[validateCNPJ]] form-control';
        document.getElementsByName("parentescoBeneficiario")[0].className = 'form-control';
        document.getElementsByName("sexoBeneficiario")[0].className = 'form-control';
        document.getElementsByName("parentescoBeneficiario")[0].className = 'form-control';
        document.getElementsByName("emailBeneficiario")[0].className = 'validate[custom[email]] form-control';
        document.getElementsByName("profissaoBeneficiario")[0].className = 'form-control';
        document.getElementsByName("estado_civilBeneficiario")[0].className = 'form-control';
    }
}

function limpar_msgholder(){
    $("#msgholder").html("");
}

function duplicarEndereco() {
    if ($("#duplicar_endereco").prop("checked")) {
        //Verificar se existe cep no campo principal
        if ($('#inputCep').val()) {
            //duplicar e desabilitar form
            $('#inputCepBenef').val($('#inputCep').val());
            $('#ruaBeneficiario').val($('#rua').val());
            $('#estadoBeneficiario').val($('#estado').val());
            $('#bairroBeneficiario').val($('#bairro').val());
            $('#n_casaBeneficiario').val($('#numero').val());
            $('#cidadeBeneficiario').val($('#cidade').val());
            $('#complementoBeneficiario').val($('#complemento').val());
            //
            document.getElementById('inputCepBenef').readOnly = true;
            document.getElementById('ruaBeneficiario').readOnly = true;
            document.getElementById('estadoBeneficiario').disabled = true;
            document.getElementById('bairroBeneficiario').readOnly = true;
            document.getElementById('n_casaBeneficiario').readOnly = true;
            document.getElementById('cidadeBeneficiario').readOnly = true;
            document.getElementById('complementoBeneficiario').readOnly = true;
        }
    } else {
        //Limpar e habilitar Campos
        $('#inputCepBenef').val('');
        $('#ruaBeneficiario').val('');
        $('#estadoBeneficiario').val('0');
        $('#bairroBeneficiario').val('');
        $('#n_casaBeneficiario').val('');
        $('#cidadeBeneficiario').val('');
        $('#complementoBeneficiario').val('');
        //
        document.getElementById('inputCepBenef').readOnly = false;
        document.getElementById('ruaBeneficiario').readOnly = false;
        document.getElementById('estadoBeneficiario').disabled = false;
        document.getElementById('bairroBeneficiario').readOnly = false;
        document.getElementById('n_casaBeneficiario').readOnly = false;
        document.getElementById('cidadeBeneficiario').readOnly = false;
        document.getElementById('complementoBeneficiario').readOnly = false;
    }

}

function formato_cobranca(tipo){
    if(tipo=='boleto'){
        document.getElementById('parcelasCarne').style.display='none';
        document.getElementById('parcelasCarne').readOnly = true;
        document.getElementsByName("parcelasCarne")[0].className = 'validate[custom[onlyNumberSp]] form-control';
    } else if(tipo=='carne'){
        document.getElementById('parcelasCarne').style.display='inline';
        document.getElementById('parcelasCarne').readOnly = false;
        document.getElementsByName("parcelasCarne")[0].className = 'validate[required,custom[onlyNumberSp]] form-control';
    }
}


$(document).ready(function () {
    //CEP
    $('#inputCep').blur(function () {
        cep.buscar();
        return false;
    });
    $('#inputCepBenef').blur(function () {
        cep.buscar_beneficiario();
        return false;
    });
    
    


});

