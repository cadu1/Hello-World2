(function(){

    $(function(){

        $.post("php/botao_pagamento.php",{aplicativo:"MEUDINHEIRO",autorizacao:"AUTORIZADO"},function(retorno){
            
            $('body').show();
            
            $("#precos-tabela").html(retorno);
            
            $("#cpf-cnpj").numeric();
            $("#cep").numeric();
            
            function _saveFields(){
                
                var cpf_cnpj = $("#cpf-cnpj").validate({
                    func : function(){
                        var v = $(this).val();
                        return v.length == 0 || isCpfCnpj(v);
                    }
                });
                var cep = $("#cep").validate({
                    func : function(){
                        var v = $(this).val().length;
                        return v == 0 || v >= 8;
                    }
                });
                
                var pessoa = $("#cpf_ou_cnpj").val();
                
                if(cpf_cnpj !== false && cep !== false){
                    ControladorEasyme('ATUALIZAR_CPF_CNPJ_CEP',JSON.stringify({cpf:cpf_cnpj,cep:cep}));
                    return true;
                }else{
                    alert('Por favor, confira os campos marcados');
                    return false;
                }
            }

            $("#confirmacao-cielo").click(function(){
                if(_saveFields()){
                    return false;
                    $("#form-cielo").attr("action","./php/easyme/processarPagamentoCielo.php");;
                    $("#form-cielo").submit();
                }
                return false;
            });
            
            $("#form_pague_seguro").submit(function(){
                if(_saveFields()){
                    $(this).submit();
                    return true;
                }
                return false;
            });
            
            $(".pagamento-forma-bandeira").click(function(){
            
                $(".pagamento-forma-bandeira.selected").removeClass('selected');
                $(this).addClass('selected');
                
                var 
                metodo =  $(this).data('tipo'),
                nome_metodo = $(this).find('span').html();

                $("#metodo_selecionado").html('Método selecionado: ' + nome_metodo).show();
                
                var tipo_pagamento= 'CREDITO',bandeira_cartao= metodo;
                
                if(metodo == 'visa_debito'){
                    tipo_pagamento = 'DEBITO';
                    bandeira_cartao = 'visa';
                }
                
                $('#parcelamento').toggle(metodo != 'visa_debito' && metodo != 'pagueseguro');
                $('.cielo').toggle(metodo != 'pagueseguro');
                $('.pagueseguro').toggle( metodo== 'pagueseguro');
                
                
                $("#form-cielo input[name='tipo_pagamento']").val(tipo_pagamento);
                $("#form-cielo input[name='bandeira_cartao']").val(bandeira_cartao);
                
            });
            
            $("#confirmar_pagamento").click(function(){
                location.href = "php/easyme/finalizandoPagamentoPagueSeguro";
            });
        });
    });  
})();
