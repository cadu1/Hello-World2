<?php //p3:{"descricao":"","tipo":"D","status":{"confirmado":1,"conciliado":0},"automatico":0,"notificacoes":{"email":{"enviar":0,"dias":0}},"valor":{"previsto":0,"efetivo":0,"compra":0},"data":{"prevista":null,"efetiva":null,"anterior":null,"compra":null},"repetir":{"repetir":false,"quantidade":1,"primeira":0,"frequencia":null,"intervalo":null,"nparcela":null,"parcela_desc":1,"ajustar_parcelas":null},"cadastros":{"conta":0,"destino":0,"centro":0,"contato":0,"forma":0,"plastico":0,"projeto":0},"sonho":null,"sonhoOp":null,"ndocumento":null,"observacoes":null,"regra":null,"comprovante":null,"proxima_fatura":0,"valor_parcela":1,"pagamento":0,"data_hora":null,"fatura":null,"grupo":null,"operacao":null} 
    if($_POST["p2"] == "NORMAL"): ?>
<input class="usr-basico" type="hidden" value="0" /><div class="cad-main cad-nl">
    <ul class="cad-main-ul cad-main-ul-nl"><li class="cad-bloco"><ul><li class="cad-opcao" >
    <span class="cad-label">Tipo</span>
    <span class="cad-data">
                <span style="display: block;">
                        <input type="radio"  id="nl-tipo-d" class="nl-tipo" name="nl-tipo" value="D" checked >
            <label for="nl-tipo-d">Despesa</label>&nbsp;
            <input type="radio"  id="nl-tipo-r" class="nl-tipo" name="nl-tipo" value="R"  >
            <label for="nl-tipo-r">Receita</label>&nbsp;
                                            <input type="radio"  id="nl-tipo-t" class="nl-tipo" name="nl-tipo" value="T"  >
                <label for="nl-tipo-t">Transferência</label>
                                    </span>
                <span style="display: block; margin-top: 5px;">
                        <input type="radio" id="nl-tipo-rep-u" class="nl-tipo-rep" name="nl-tipo-rep" value="U" checked>
            <label for="nl-tipo-rep-u">Única</label>&nbsp;
            <input type="radio" id="nl-tipo-rep-f" class="nl-tipo-rep" name="nl-tipo-rep" value="F" >
            <label for="nl-tipo-rep-f">Fixa</label>&nbsp;
            <input type="radio" id="nl-tipo-rep-p" class="nl-tipo-rep" name="nl-tipo-rep" value="P" >
            <label for="nl-tipo-rep-p">Parcelada</label>
                    </span>
        <div class="nl-rep" style="display: none;" >
                        <table>
                <tr class="nl-rep-parc" >
                    <td class="nl-rep-label">Número de parcelas</td>
                    <td><input class="nl-rep-quant" type="text" maxlength="3" value="2"  style="width: 25px;"/></td>
                </tr>
                <tr class="nl-rep-parc" >
                    <td class="nl-rep-label">Parcela inicial</td>
                    <td><input class="nl-rep-ini" type="text" maxlength="3" value="1" style="width: 25px;"/></td>
                </tr>
                
                <tr>
                    <td class="nl-rep-label">Repete-se a cada</td>
                    <td>
                        <input class="nl-rep-freq" type="text" maxlength="2" size="2" value="1" style="width: 25px;"/>
                                                <select class="nl-rep-inter" style="width:80px;" >
                            <option value='DAY' >Dia</option><option value='WEEK' >Semana</option><option value='MONTH' selected>Mês</option><option value='YEAR' >Ano</option>                        </select>
                                            </td>
                </tr>
                
            </table>
                    </div>
            </span>
</li><li class="cad-opcao">
    <span class="cad-label">Descrição</span>
    <span class="cad-data">
        <span style="display: inline-block;">
                        <input type="text" 
                   value=""
                   style="width:277px;"
                                      class="cad-input-text nl-desc autocomplete-input campo-regras"/>
                    </span>
                <div class="nl-parcela-desc" style="display:none;">
            <input type="checkbox" id="incluir-nparcela-desc" checked>
            <label for="incluir-nparcela-desc">Incluir número da parcela na descrição.</label>
        </div>
        <div class="nl-nova-regra-box" style="display:none;">
            
            <label for="checkbox-criar-nova-regra">
                <input type="checkbox" class="nl-regra" id="checkbox-criar-nova-regra" style="margin-right: 3px;"/>
                Criar uma nova regra de preenchimento com as informações acima
            </label>
                    </div>
            </span>
</li><li class="cad-opcao" >
    <span class="cad-label">Valor</span>
    <span class="cad-data">
        <div style="line-height: 30px;">
            <input type="text" 
                   size="20"
                   value="0,00"
                   class="cad-input-text nl-valor-prev small-input"/> 
                    </div>
            </span>
</li>
<li class="cad-opcao" >
    <span class="cad-label">Data</span>
    <span class="cad-data">
        <span style="display: inline-block;">
                        <input type="text" 
                   class="cad-input-text nl-data-prev small-input" 
                   size="20"
                   value="16/05/2014"/>
                </span>
            </span>
</li>
<li class="cad-opcao nl-status nl-confirmado">
    <span class="cad-label"> </span>
    <span class="cad-data">
        <input type="checkbox" 
               title="Este lançamento já foi confirmado." 
               id="checkbox-confirmado"
               class="nl-checkbox-confirmado"
               checked                tabindex='0' />
        <label for="checkbox-confirmado" 
               title="Este lançamento já foi confirmado.">
            Pagamento já realizado 
        </label>
            </span>
</li>
<li class="cad-opcao nl-status nl-conciliado" >
    <span class="cad-label"> </span>
    <span class="cad-data">
        <input type="checkbox" 
               title="Este lançamento já foi conciliado." 
               id="checkbox-conciliado"
               class="nl-checkbox-conciliado"
                               tabindex='0' />
        <label for="checkbox-conciliado" title="Este lançamento já foi conciliado.">
            Lançamento já conciliado
        </label>
    </span>
</li><li class="cad-opcao nl-automatico">
    <span class="cad-label"> </span>
    <span class="cad-data">
        <input type="checkbox" 
               id="checkbox-automatico"
               class="nl-automatico"
                tabindex='0'                />
        <label for="checkbox-automatico">Confirmar automaticamente na data prevista</label>
    </span>
</li><li class="cad-opcao nl-lembrete">
    <span class="cad-label"> </span>
    <span class="cad-data">
        <input type="checkbox" 
               id="checkbox_email" 
               class="nl-lembrete-email" 
               title="Notificação por email"
                 tabindex='0' >
        <label for="checkbox_email"  title="Notificação por email">Lembrar por email</label>
            <select id="select_email_lancamento" class="nl-lembrete-email-dias small-select">
                <option value="0">no dia</option>
                <option value='1' >1 dia antes</option><option value='2' >2 dias antes</option><option value='3' >3 dias antes</option><option value='4' >4 dias antes</option><option value='5' >5 dias antes</option>            </select>
    </span>
</li>
 </ul></li><li class="cad-bloco"><ul><li class="cad-opcao nl-normal nl-despesa" >
    <span class="cad-label">Categoria</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-categorias nl-categorias-d"  tabindex='0' >
            <option value='968525' >Automóvel</option><option value='968526' >Bem Estar</option><option value='968527' >Educação</option><option value='968528' >Empregados</option><option value='968519' >Familiares Diversas</option><option value='968518' >Impostos e Tarifas</option><option value='968517' >Investimentos</option><option value='968508' >Lazer</option><option value='968509' >Moradia</option><option value='968510' selected>Outras despesas</option><option value='968511' >Pessoais</option><option value='968512' >Previdência</option><option value='968513' >Saúde</option><option value='968514' >Seguros</option><option value='968515' >Telefonia</option><option value='968516' >Transporte</option><option value='968529' >Vestuário </option>        </select>
        
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-normal nl-receita" style="display: none;">
    <span class="cad-label">Categoria</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-categorias nl-categorias-r"  tabindex='0' >
            <option value='968521' >Aluguel</option><option value='968520' >Investimentos</option><option value='968522' >Lucros</option><option value='968524' selected>Outras receitas</option><option value='968523' >Pró-labore</option><option value='968507' >Salário</option>        </select>
        
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li><li class="cad-opcao nl-normal" >
    <span class="cad-label">Conta</span>
    <span class="cad-data">
        
        <select class="autocompleteselect nl-cadastro nl-conta nl-contas"  tabindex='0' >
                        <option value="0">Nenhuma</option>
                        <option value='37430' >Carteira</option><option value='37404' >Teste Conta</option>        </select>
        
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-transf nl-transf-a" style="display: none;">
    <span class="cad-label">Origem</span>
    <span class="cad-data">
        <select class="autocompleteselect nl-cadastro nl-conta-o nl-contas"  tabindex='0' >
            <option value='37430'  >Carteira</option><option value='37404'  >Teste Conta</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-transf nl-transf-a" style="display: none;">
    <span class="cad-label">Destino</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-conta-d nl-contas"  tabindex='0' >
            <option value='37430' >Carteira</option><option value='37404' selected>Teste Conta</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-normal nl-despesa" >
    <span class="cad-label">Centro</span>
    <span class="cad-data">
        
        <select class="autocompleteselect nl-cadastro nl-centros nl-centro-d"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='18043' >teste centros</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-normal nl-receita" style="display: none;">
    <span class="cad-label">Centro</span>
    <span class="cad-data">
        <select class="autocompleteselect nl-cadastro nl-centros nl-centro-r"  tabindex='0' >
            <option value="0">Nenhum</option>
                    </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>    <li class="cad-opcao nl-normal" >
        <span class="cad-label">Forma pagto.</span>
        <span class="cad-data">

            <select class="autocompleteselect nl-cadastro nl-forma"  tabindex='0' >
                <option value="0">Nenhuma</option>
                <option value='316645' >Boleto</option><option value='316646' >Cartão de Crédito</option><option value='316647' >Cartão de Débito</option><option value='316648' >Cheque</option><option value='316651' >DOC/TED</option><option value='316649' >Depósito</option><option value='316650' >Dinheiro</option><option value='316652' >Débito Automático</option><option value='316653' >Internet</option><option value='316654' >Outros</option>            </select>

            <a href="javascript:void(0);" class="link-add">Adicionar</a>

        </span>
    </li>
<li class="cad-opcao nl-normal" >
    <span class="cad-label nl-receita" style="display: none;">Pagador</span>
    <span class="cad-label nl-despesa" >Favorecido</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-contato"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='71005' >Teste Fisico</option><option value='71006' >Teste Juridico</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li><li class="cad-opcao nl-normal" >
    <span class="cad-label">Projetos</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-projeto"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='1045' >Teste Projeto</option>        </select>

        <a href="javascript:void(0);" class="link-add">Adicionar</a>

    </span>
</li>

</ul></li><li class="cad-bloco"><ul><li class="cad-opcao">
    <span class="cad-label">N. documento</span>
    <span class="cad-data">
        <input type="text" 
                style="width:277px;"
               maxlength="60"
               value=""
               class="cad-input-text nl-ndoc"
                tabindex='0' />
    </span>
</li><li class="cad-opcao">
    <span class="cad-label">Observações</span>
    <span class="cad-data">
        <textarea class="nl-obs" maxlength="398"  tabindex='0' ></textarea>
    </span>
</li></ul></li></ul></div>
<?php //p3:{"descricao":"","tipo":"D","status":{"confirmado":0,"conciliado":0},"automatico":0,"notificacoes":{"email":{"enviar":0,"dias":0}},"valor":{"previsto":0,"efetivo":0,"compra":0},"data":{"prevista":null,"efetiva":null,"anterior":null,"compra":null},"repetir":{"repetir":false,"quantidade":1,"primeira":0,"frequencia":null,"intervalo":null,"nparcela":null,"parcela_desc":1,"ajustar_parcelas":null},"cadastros":{"conta":"37405","destino":0,"centro":0,"contato":0,"forma":0,"plastico":0,"projeto":0},"sonho":null,"sonhoOp":null,"ndocumento":null,"observacoes":null,"regra":null,"comprovante":null,"proxima_fatura":0,"valor_parcela":1,"pagamento":0,"data_hora":null,"fatura":null,"grupo":null,"operacao":null,"cartao":true}
    elseif($_POST["p2"] == "CARTAO"): ?>
<input class="usr-basico" type="hidden" value="0" /><div class="cad-main cad-nl">
    <ul class="cad-main-ul cad-main-ul-nl"><li class="cad-bloco"><ul><li class="cad-opcao" >
    <span class="cad-label">Tipo</span>
    <span class="cad-data">
                <span style="display: block;">
                        <input type="radio"  id="nl-tipo-d" class="nl-tipo" name="nl-tipo" value="D" checked >
            <label for="nl-tipo-d">Despesa</label>&nbsp;
            <input type="radio"  id="nl-tipo-r" class="nl-tipo" name="nl-tipo" value="R"  >
            <label for="nl-tipo-r">Receita</label>&nbsp;
                                            <input type="radio"  id="nl-tipo-t" class="nl-tipo" name="nl-tipo" value="T"  >
                <label for="nl-tipo-t">Transferência</label>
                                    </span>
                <span style="display: block; margin-top: 5px;">
                        <input type="radio" id="nl-tipo-rep-u" class="nl-tipo-rep" name="nl-tipo-rep" value="U" checked>
            <label for="nl-tipo-rep-u">Única</label>&nbsp;
            <input type="radio" id="nl-tipo-rep-f" class="nl-tipo-rep" name="nl-tipo-rep" value="F" >
            <label for="nl-tipo-rep-f">Fixa</label>&nbsp;
            <input type="radio" id="nl-tipo-rep-p" class="nl-tipo-rep" name="nl-tipo-rep" value="P" >
            <label for="nl-tipo-rep-p">Parcelada</label>
                    </span>
        <div class="nl-rep" style="display: none;" >
                        <table>
                <tr class="nl-rep-parc" >
                    <td class="nl-rep-label">Número de parcelas</td>
                    <td><input class="nl-rep-quant" type="text" maxlength="3" value="2"  style="width: 25px;"/></td>
                </tr>
                <tr class="nl-rep-parc" >
                    <td class="nl-rep-label">Parcela inicial</td>
                    <td><input class="nl-rep-ini" type="text" maxlength="3" value="1" style="width: 25px;"/></td>
                </tr>
                
                <tr>
                    <td class="nl-rep-label">Repete-se a cada</td>
                    <td>
                        <input class="nl-rep-freq" type="text" maxlength="2" size="2" value="1" style="width: 25px;"/>
                                                <span style="font-weight: bold;vertical-align: middle;font-size: 11px;">mês</span>
                                            </td>
                </tr>
                
            </table>
                    </div>
            </span>
</li><li class="cad-opcao">
    <span class="cad-label">Descrição</span>
    <span class="cad-data">
        <span style="display: inline-block;">
                        <input type="text" 
                   value=""
                   style="width:277px;"
                                      class="cad-input-text nl-desc autocomplete-input campo-regras"/>
                    </span>
                <div class="nl-parcela-desc" style="display:none;">
            <input type="checkbox" id="incluir-nparcela-desc" checked>
            <label for="incluir-nparcela-desc">Incluir número da parcela na descrição.</label>
        </div>
        <div class="nl-nova-regra-box" style="display:none;">
            
            <label for="checkbox-criar-nova-regra">
                <input type="checkbox" class="nl-regra" id="checkbox-criar-nova-regra" style="margin-right: 3px;"/>
                Criar uma nova regra de preenchimento com as informações acima
            </label>
                    </div>
            </span>
</li><li class="cad-opcao" >
    <span class="cad-label">Valor</span>
    <span class="cad-data">
        <div style="line-height: 30px;">
            <input type="text" 
                   size="20"
                   value="0,00"
                   class="cad-input-text nl-valor-prev small-input"/> 
                        <span class="nl-eh-valor-parc">
                <input type="checkbox" id="digitar-valor-parcela" >
                <label for="digitar-valor-parcela">Valor da parcela.</label>
            </span>
                    </div>
                <div class="nl-info-parc" style="display: none;">
            <span></span>
            <select>
                <option value="1" selected ></option>
                <option value="2" ></option>
            </select>
        </div>
            </span>
</li>
<li class="cad-opcao" >
    <span class="cad-label">Data</span>
    <span class="cad-data">
        <span style="display: inline-block;">
                        <input type="text" 
                   class="cad-input-text nl-data-prev small-input" 
                   size="20"
                   value="16/05/2014"/>
                </span>
                <div class="nl-lancar-fatura">
            Lançar na:
            <input type="radio" name="entrar_fatura" value="0" id="radio_esta_fatura" checked/>
            <label for="radio_esta_fatura" >Fatura atual</label>&nbsp;&nbsp;&nbsp;
            <input type="radio" name="entrar_fatura" value="1" id="radio_proxima_fatura" />
            <label for="radio_proxima_fatura" >Próxima fatura</label>
        </div>
            </span>
</li>
</ul></li><li class="cad-bloco"><ul><li class="cad-opcao" >
    <span class="cad-label">Cartão</span>
    <span class="cad-data">
        <select class="autocompleteselect nl-cadastro nl-plastico"  tabindex='0' >
                        <option value="14730" 
                    >
                TESTE            </option>
                    </select>        
    </span>
</li><li class="cad-opcao nl-normal nl-despesa" >
    <span class="cad-label">Categoria</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-categorias nl-categorias-d"  tabindex='0' >
            <option value='968525' >Automóvel</option><option value='968526' >Bem Estar</option><option value='968527' >Educação</option><option value='968528' >Empregados</option><option value='968519' >Familiares Diversas</option><option value='968518' >Impostos e Tarifas</option><option value='968517' >Investimentos</option><option value='968508' >Lazer</option><option value='968509' >Moradia</option><option value='968510' selected>Outras despesas</option><option value='968511' >Pessoais</option><option value='968512' >Previdência</option><option value='968513' >Saúde</option><option value='968514' >Seguros</option><option value='968515' >Telefonia</option><option value='968516' >Transporte</option><option value='968529' >Vestuário </option>        </select>
        
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-normal nl-receita" style="display: none;">
    <span class="cad-label">Categoria</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-categorias nl-categorias-r"  tabindex='0' >
            <option value='968521' >Aluguel</option><option value='968520' >Investimentos</option><option value='968522' >Lucros</option><option value='968524' selected>Outras receitas</option><option value='968523' >Pró-labore</option><option value='968507' >Salário</option>        </select>
        
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li><li class="cad-opcao nl-transf nl-transf-a" style="display: none;">
    <span class="cad-label">Destino</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-conta-d nl-contas"  tabindex='0' >
            <option value='37430' selected>Carteira</option><option value='37404' >Teste Conta</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-normal nl-despesa" >
    <span class="cad-label">Centro</span>
    <span class="cad-data">
        
        <select class="autocompleteselect nl-cadastro nl-centros nl-centro-d"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='18043' >teste centros</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-normal nl-receita" style="display: none;">
    <span class="cad-label">Centro</span>
    <span class="cad-data">
        <select class="autocompleteselect nl-cadastro nl-centros nl-centro-r"  tabindex='0' >
            <option value="0">Nenhum</option>
                    </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li><input type="hidden" class="nl-cadastro nl-forma" value="316646">
<li class="cad-opcao nl-normal" >
    <span class="cad-label nl-receita" style="display: none;">Pagador</span>
    <span class="cad-label nl-despesa" >Favorecido</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-contato"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='71005' >Teste Fisico</option><option value='71006' >Teste Juridico</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li><li class="cad-opcao nl-normal" >
    <span class="cad-label">Projetos</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-projeto"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='1045' >Teste Projeto</option>        </select>

        <a href="javascript:void(0);" class="link-add">Adicionar</a>

    </span>
</li>

</ul></li><li class="cad-bloco"><ul><li class="cad-opcao">
    <span class="cad-label">N. documento</span>
    <span class="cad-data">
        <input type="text" 
                style="width:277px;"
               maxlength="60"
               value=""
               class="cad-input-text nl-ndoc"
                tabindex='0' />
    </span>
</li><li class="cad-opcao">
    <span class="cad-label">Observações</span>
    <span class="cad-data">
        <textarea class="nl-obs" maxlength="398"  tabindex='0' ></textarea>
    </span>
</li></ul></li></ul></div>
<?php elseif($_POST["p2"] == "GRUPO"):?>
<input class="usr-basico" type="hidden" value="0" /><div style="overflow: hidden;">
            <div class="cad-main cad-nl cad-nl-grupo">
        <ul class="cad-main-ul cad-main-ul-nl"><li class="cad-bloco"><ul><li class="cad-opcao" >
    <span class="cad-label">Tipo</span>
    <span class="cad-data">
                <span style="display: block; ">
                        <input type="radio" id="nl-tipo-rep-u" class="nl-tipo-rep" name="nl-tipo-rep" value="U" checked>
            <label for="nl-tipo-rep-u">Única</label>&nbsp;
            <input type="radio" id="nl-tipo-rep-f" class="nl-tipo-rep" name="nl-tipo-rep" value="F" >
            <label for="nl-tipo-rep-f">Fixa</label>&nbsp;
            <input type="radio" id="nl-tipo-rep-p" class="nl-tipo-rep" name="nl-tipo-rep" value="P" >
            <label for="nl-tipo-rep-p">Parcelada</label>
                    </span>
        <div class="nl-rep" style="display: none;" >
                        <table>
                <tr class="nl-rep-parc" >
                    <td class="nl-rep-label">Número de parcelas</td>
                    <td><input class="nl-rep-quant" type="text" maxlength="3" value="2"  style="width: 25px;"/></td>
                </tr>
                <tr class="nl-rep-parc" >
                    <td class="nl-rep-label">Parcela inicial</td>
                    <td><input class="nl-rep-ini" type="text" maxlength="3" value="1" style="width: 25px;"/></td>
                </tr>
                
                <tr>
                    <td class="nl-rep-label">Repete-se a cada</td>
                    <td>
                        <input class="nl-rep-freq" type="text" maxlength="2" size="2" value="1" style="width: 25px;"/>
                                                <select class="nl-rep-inter" style="width:80px;" >
                            <option value='DAY' >Dia</option><option value='WEEK' >Semana</option><option value='MONTH' selected>Mês</option><option value='YEAR' >Ano</option>                        </select>
                                            </td>
                </tr>
                
            </table>
                    </div>
            </span>
</li><li class="cad-opcao">
    <span class="cad-label">Descrição</span>
    <span class="cad-data">
        <span style="display: inline-block;">
                        <input type="text" 
                   value=""
                   style="width:277px;"
                                      class="cad-input-text nl-desc "/>
                    </span>
                <div class="nl-parcela-desc" style="display:none;">
            <input type="checkbox" id="incluir-nparcela-desc" checked>
            <label for="incluir-nparcela-desc">Incluir número da parcela na descrição.</label>
        </div>
        <div class="nl-nova-regra-box" style="display:none;">
            
            <label for="checkbox-criar-nova-regra">
                <input type="checkbox" class="nl-regra" id="checkbox-criar-nova-regra" style="margin-right: 3px;"/>
                Criar uma nova regra de preenchimento com as informações acima
            </label>
                    </div>
            </span>
</li><li class="cad-opcao" >
    <span class="cad-label">Data</span>
    <span class="cad-data">
        <span style="display: inline-block;">
                        <input type="text" 
                   class="cad-input-text nl-data-prev small-input" 
                   size="20"
                   value="16/05/2014"/>
                </span>
            </span>
</li>
<li class="cad-opcao nl-status nl-confirmado">
    <span class="cad-label"> </span>
    <span class="cad-data">
        <input type="checkbox" 
               title="Este lançamento já foi confirmado." 
               id="checkbox-confirmado"
               class="nl-checkbox-confirmado"
               checked                tabindex='0' />
        <label for="checkbox-confirmado" 
               title="Este lançamento já foi confirmado.">
            Pagamento já realizado 
        </label>
            </span>
</li>
<li class="cad-opcao nl-status nl-conciliado" >
    <span class="cad-label"> </span>
    <span class="cad-data">
        <input type="checkbox" 
               title="Este lançamento já foi conciliado." 
               id="checkbox-conciliado"
               class="nl-checkbox-conciliado"
                               tabindex='0' />
        <label for="checkbox-conciliado" title="Este lançamento já foi conciliado.">
            Lançamento já conciliado
        </label>
    </span>
</li><li class="cad-opcao nl-automatico">
    <span class="cad-label"> </span>
    <span class="cad-data">
        <input type="checkbox" 
               id="checkbox-automatico"
               class="nl-automatico"
                tabindex='0'                />
        <label for="checkbox-automatico">Confirmar automaticamente na data prevista</label>
    </span>
</li><li class="cad-opcao nl-lembrete">
    <span class="cad-label"> </span>
    <span class="cad-data">
        <input type="checkbox" 
               id="checkbox_email" 
               class="nl-lembrete-email" 
               title="Notificação por email"
                 tabindex='0' >
        <label for="checkbox_email"  title="Notificação por email">Lembrar por email</label>
            <select id="select_email_lancamento" class="nl-lembrete-email-dias small-select">
                <option value="0">no dia</option>
                <option value='1' >1 dia antes</option><option value='2' >2 dias antes</option><option value='3' >3 dias antes</option><option value='4' >4 dias antes</option><option value='5' >5 dias antes</option>            </select>
    </span>
</li>
 </ul></li><li class="cad-bloco"><ul><li class="cad-opcao nl-normal" >
    <span class="cad-label">Conta</span>
    <span class="cad-data">
        
        <select class="autocompleteselect nl-cadastro nl-conta nl-contas"  tabindex='0' >
                        <option value="0">Nenhuma</option>
                        <option value='37430' >Carteira</option><option value='37404' >Teste Conta</option>        </select>
        
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-transf nl-transf-a" style="display: none;">
    <span class="cad-label">Origem</span>
    <span class="cad-data">
        <select class="autocompleteselect nl-cadastro nl-conta-o nl-contas"  tabindex='0' >
            <option value='37430'  >Carteira</option><option value='37404'  >Teste Conta</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-transf nl-transf-a" style="display: none;">
    <span class="cad-label">Destino</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-conta-d nl-contas"  tabindex='0' >
            <option value='37430' >Carteira</option><option value='37404' selected>Teste Conta</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
    <li class="cad-opcao nl-normal" >
        <span class="cad-label">Forma pagto.</span>
        <span class="cad-data">

            <select class="autocompleteselect nl-cadastro nl-forma"  tabindex='0' >
                <option value="0">Nenhuma</option>
                <option value='316645' >Boleto</option><option value='316646' >Cartão de Crédito</option><option value='316647' >Cartão de Débito</option><option value='316648' >Cheque</option><option value='316651' >DOC/TED</option><option value='316649' >Depósito</option><option value='316650' >Dinheiro</option><option value='316652' >Débito Automático</option><option value='316653' >Internet</option><option value='316654' >Outros</option>            </select>

            <a href="javascript:void(0);" class="link-add">Adicionar</a>

        </span>
    </li>
<li class="cad-opcao nl-normal" >
    <span class="cad-label">Projetos</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-projeto"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='1045' >Teste Projeto</option>        </select>

        <a href="javascript:void(0);" class="link-add">Adicionar</a>

    </span>
</li>

</ul></li><li class="cad-bloco"><ul><li class="cad-opcao">
    <span class="cad-label">N. documento</span>
    <span class="cad-data">
        <input type="text" 
                style="width:277px;"
               maxlength="60"
               value=""
               class="cad-input-text nl-ndoc"
                tabindex='0' />
    </span>
</li><li class="cad-opcao">
    <span class="cad-label">Observações</span>
    <span class="cad-data">
        <textarea class="nl-obs" maxlength="398"  tabindex='0' ></textarea>
    </span>
</li></ul></li></ul>    </div>
</div>
<?php endif; ?>