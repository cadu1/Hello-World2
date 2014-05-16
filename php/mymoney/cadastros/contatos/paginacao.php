<script>
$(function(){
    var paginacao_inicio = ;
    var quantidade_horiz = ;

    $(".pag_ant").click(function(){
       var parametros = carregar_parametros_filtro();
       ControladorContatos("CARREGAR_CONTATOS",parametros,paginacao_inicio - quantidade_horiz , paginacao_inicio - 1 ,function(r){
             $("#conteudo_contatos").html(r);
       });
    });
    $(".pag_num").click(function(){
       var parametros = carregar_parametros_filtro(); 
       ControladorContatos("CARREGAR_CONTATOS",parametros,paginacao_inicio , $(this).attr("pag") ,function(r){
             $("#conteudo_contatos").html(r);
       });
    });
    $(".pag_fim").click(function(){
       var parametros = carregar_parametros_filtro();
       ControladorContatos("CARREGAR_CONTATOS",parametros,paginacao_inicio + quantidade_horiz , paginacao_inicio + quantidade_horiz ,function(r){
             $("#conteudo_contatos").html(r);

       });
    });
});
</script>
