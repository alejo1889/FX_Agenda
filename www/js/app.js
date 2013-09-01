
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
   

    // Install the layouts
    require('layouts/layouts');

    
    // List view
    var list = $('.list').get(0);
  
    // Detail view
    var detail = $('.detail').get(0);
    detail.render = function(item) {
        $('.title', this).html(item.get('title'));
        $('.desc', this).html(item.get('desc'));
        $('.date', this).html("Fecha: "+item.get('date'));
        $('.timebegin', this).html("Hora de Inicio: "+item.get('timebegin'));
        $('.timeend', this).html("Hora de Finalizaci&oacute;n: "+item.get('timeend'));
    };

    // Edit view
    var edit = $('.edit').get(0);

    edit.render = function(item) {
        item = item || { id: '', get: function() { return ''; } };
        $('input[name=id]', this).val(item.id);
        $('input[name=title]', this).val(item.get('title'));
        $('input[name=desc]', this).val(item.get('desc'));
        $('input[name=date]', this).val(item.get('date'));
        $('input[name=timebegin]', this).val(item.get('timebegin'));
        $('input[name=timeend]', this).val(item.get('timeend'));
    };

    edit.getTitle = function() {
        var model = this.view.model;

        if(model) {
            return model.get('title');
        }
        else {
            return 'Nuevo Evento';
        }
    };

    $('button.add', edit).click(function() {
        var el = $(edit);
        var title = el.find('input[name=title]');
        var desc = el.find('input[name=desc]');
        var date = el.find('input[name=date]');
        var timebegin = el.find('input[name=timebegin]');
        var timeend = el.find('input[name=timeend]');
        var model = edit.model;

        if(model) {
            model.set({ title: title.val(), desc: desc.val(), date: date.val(), timebegin: timebegin.val(), timeend: timeend.val()});
        }
        else {
            list.add({ title: title.val(),
                       desc: desc.val(),
                       date: date.val(),
                       timebegin: timebegin.val(),
                       timeend: timeend.val() });
        }

        edit.close();
    });


});