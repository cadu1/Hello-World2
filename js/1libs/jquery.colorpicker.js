(function(window,$){
    
var 
CP = function( o , c){
    
    var 
    colors = [
        ["F6C5BE","EFA093","E66550","CC3A21","AC2B16","822111"],
        ["FFE6C7","FFD6A2","FFBC6B","EAA041","CF8933","A46A21"],
        ["FEF1D1","FCE8B3","FCDA83","F2C960","D5AE49","AA8831"],
        ["B9E4D0","89D3B2","44B984","149E60","0B804B","076239"],
        ["C6F3DE","A0EAC9","68DFA9","3DC789","2A9C68","1A764D"],
        ["C9DAF8","A4C2F4","6D9EEB","3C78D8","285BAC","1C4587"],
        ["E4D7F5","D0BCF1","B694E8","8E63CE","653E9B","41236D"],
        ["FCDEE8","FBC8D9","F7A7C0","E07798","B65775","83334C"]
    ],
    cfg = $.extend(true,{
        colors : colors,
        pickerClass : 'table-cores',
        previewClass : 'colorpicker-preview',
        create : function(){},
        select : function(){}
    },c),
    preview = $("<div class='"+cfg.previewClass+"'></div>"),
    /*Cor selecionada atualmente*/
    current;
    
    function _create(){
        var 
        i = 0,
        cols = colors[0].length,
        table = $("<table class='"+cfg.pickerClass+"'></table>");
                
        for(;i < cols;i++){
            var tr = $("<tr></tr>");
            $.each(colors,function(){
                var td = $("<td></td>"),
                div = $("<div style='background-color:#"+this[i]+";'></div>");
                
                div.data('cpcolor',this[i]).click(function(){
                    _select($(this).data('cpcolor'));
                });
                
                $(td).html(div);
                $(tr).append(td);
            });
            table.append(tr);
        }
    
        $(o).html(table);
        
        var prev = $("."+cfg.previewClass);
        if(prev[0]){
            preview = prev;
        }else{
            table.before(preview);
        }
        
        preview.width(table.width());
        
        cfg.create();
    }
    
    function _select(cor){
        preview.css('background-color',"#"+cor);
        cfg.select(cor);
        current = cor;
    }
    
    function _randomColor(){
        var 
        rows = colors.length - 1,
        cols = colors[0].length - 1,
        rand_row = Math.floor(Math.random()*rows+1),
        rand_col = Math.floor(Math.random()*cols+1);
        if(rand_row <= rows && rand_col <= cols)
            return colors[rand_row][rand_col];
        else
            return colors[0][0];
        
        
    }
    
    this.get = function(){
        return current;
    };
    
    _create();
    
    _select($(o).data('cpcolor') || _randomColor());
};

/*Tornando metodo de jQuery tambem*/
$.fn.colorpicker = function(c){
    return this.each(function(){
        var cp = new CP( this ,c );
        $(this).data('colorpicker',cp);
    });
};

})(window,jQuery);