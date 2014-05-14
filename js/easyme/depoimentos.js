$(function(){
    
    var _salvar = function(){
        
        var depo = $("#make-depo").val();
        
        if(depo.length > 5000){
            alert('Tamanho excedido');
            return;
        }
        
        $.post('visao/php/easyme/salvarDepoimento.php',{depo:depo},function(r){
            if(r != '0' && r != '-1'){
                alert('Depoimento salvo com sucesso.')
                $("#make-depo-date").html("Última edição em: " + r);
                $("#make-depo-status").show();
            }else if(r == '0'){
                alert('Falha ao registrar depoimento.');
            }else{
                alert('Falha ao atualizar depoimento.');
            }
        });
    },
     _checkMin = function(){
        $("#make-depo-send").toggleClass('disabled',$("#make-depo").val().length < 10);
    };
    
    $("#make-depo").keyup(_checkMin);
    
    $("#make-depo-send").click(function(){
        if($(this).is('.disabled')) return;
        _salvar();
    });
    
    
    _checkMin();
});