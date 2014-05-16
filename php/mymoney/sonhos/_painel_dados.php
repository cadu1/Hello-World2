<div class="cad-main cad-ns">
    <ul class="cad-main-ul">
        <li class="cad-bloco">
            <ul>
                <li class="cad-opcao">
                    <span class="cad-label">Descrição</span>
                    <span class="cad-data">
                        <input type="text" class="cad-input-text" id="novo-sonho-descricao" value="" tip='Informe uma descrição para sua meta. Exemplo: "Trocar o carro", "Viajar de férias"'/>
                    </span>
                </li>
                <li class="cad-opcao">
                    <span class="cad-label">Valor alvo</span>
                    <span class="cad-data">
                        <input type="text" class="cad-input-text input-currency" id="novo-sonho-valor" value="R$ 0,00" tip='É o valor total que prentende economizar para realizar sua meta'/>
                    </span>
                </li>
                <li class="cad-opcao">
                    <span class="cad-label">Vencimento</span>
                    <span class="cad-data">
                                                <select id="novo-sonho-mes" class="select-full-month">
                                                        <option value="01" >Janeiro</option>
                                                        <option value="02" >Fevereiro</option>
                                                        <option value="03" >Março</option>
                                                        <option value="04" >Abril</option>
                                                        <option value="05" >Maio</option>
                                                        <option value="06" selected>Junho</option>
                                                        <option value="07" >Julho</option>
                                                        <option value="08" >Agosto</option>
                                                        <option value="09" >Setembro</option>
                                                        <option value="10" >Outubro</option>
                                                        <option value="11" >Novembro</option>
                                                        <option value="12" >Dezembro</option>
                                                    </select>
                        <select id="novo-sonho-ano" tip='A data em que prentende realizar sua meta' class="select-year">
                                                        <option value="2014" selected>2014</option>
                                                        <option value="2015" >2015</option>
                                                        <option value="2016" >2016</option>
                                                        <option value="2017" >2017</option>
                                                        <option value="2018" >2018</option>
                                                        <option value="2019" >2019</option>
                                                        <option value="2020" >2020</option>
                                                        <option value="2021" >2021</option>
                                                        <option value="2022" >2022</option>
                                                        <option value="2023" >2023</option>
                                                        <option value="2024" >2024</option>
                                                        <option value="2025" >2025</option>
                                                        <option value="2026" >2026</option>
                                                        <option value="2027" >2027</option>
                                                        <option value="2028" >2028</option>
                                                        <option value="2029" >2029</option>
                                                        <option value="2030" >2030</option>
                                                        <option value="2031" >2031</option>
                                                        <option value="2032" >2032</option>
                                                        <option value="2033" >2033</option>
                                                    </select>
                    </span>
                </li>
                <li class="cad-opcao">
                    <span class="cad-label">Taxa mensal</span>
                    <span class="cad-data">
                            <input type="text" class="cad-input-text" id="novo-sonho-taxa" value="0,60" tip='Estime uma percentual médio mensal de correção para a aplicação que utilizará'/>
                            <span style="line-height:28px;padding-left: 5px;">%</span>
                    </span>
                </li>
                <li class="cad-opcao" style="display: none">
                    <span class="cad-label"></span>
                    <span class="cad-data" id="novo-sonho-sugestao-aplicacao">
                        <span id="novo-sonho-sugestao-ok">
                            <div>Sugestão de aplicacao mensal:</div>
                            <div id="novo-sonho-sugestao-aplicacao-valor"></div>
                                                        <div style="text-align: justify;">
                                <input type='checkbox' id='novo-sonho-agendar' checked/>
                                <label for='novo-sonho-agendar' style='padding-left:5px'>
                                    Abrir tela de agendamento deste valor após a inclusão da meta.
                                </label>
                            </div>
                                                    </span>
                        <span id="novo-sonho-sugestao-nok">O vencimento de sua aplicação deve ser posterior ao mês atual.</span>
                    </span>
                </li>
            </ul>
        </li>
        <li class="cad-bloco">
            <ul>
                <li class="cad-opcao">
                    <span class="cad-label">Conta associada</span>
                    <span class="cad-data">
                        <span style="display: inline-block;">
                            <select id="select-sonho-contas" tip='A conta que usará para realizar a poupança desejada'>
                                                            <option value="37430"
                                        saldo="141.31"
                                        >
                                    Carteira                                </option>
                                                            <option value="37404"
                                        saldo="1.00"
                                        >
                                    Teste Conta                                </option>
                                                        </select>
                            <a href="javascript:void(0);" class="link-add" id="sonho-nova-conta">Adicionar</a>
                        </span>
                        <span id="sonho-exibe-saldo-conta" style="display: none;"></span>
                    </span>
                </li>
                <li class="cad-opcao">
                    <span class="cad-label">Saldo inicial</span>
                    <span class="cad-data">
                        <input type="text" class="cad-input-text input-currency" id="sonho-saldo-inicial-conta" value="R$ 0,00" tip='Se a conta já existir, informe o saldo dela	que já está destinado para realização da meta'/>
                    </span>
                </li>
                <li class="cad-opcao">
                    <span class="cad-label">Data saldo inicial</span>
                    <span class="cad-data">
                        <input type="text" class="cad-input-text input-date" id="sonho-data-saldo-inicial-conta" value="16/05/2014" tip='Informe uma data inicial de controle da sua meta'/>
                    </span>
                </li>
            </ul>
        </li>
            </ul>
</div>
