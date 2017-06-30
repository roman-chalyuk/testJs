/**
 * Created by roman on 27.02.17.
 */
$(document).ready(function () {
    // $('#active').on('click', function() {
    //     // alert('data complete');
    //     test();
    // });

    $('#input-val').on('click', function () {
        actionWithInput();
    });

    $('#input-val').on('keypress', function (e) {
        if(e.keyCode == 13) {
            // e.preventDefault();
            actionWithInput();
        }
    });

    $('.filters').bind("mouseover", function (e){
        getDeleteButton(e);
        checkboxText(e);
        checkboxControl();
    });

    if ("geolocation" in navigator) {
        // alert('Geolocation true');
        navigator.geolocation.getCurrentPosition(
            displayPosition
        );
    } else {
        /* геолокация НЕдоступна */
    }

    // alert('sdfsf');

    $('#all').on('click', function () {
        getAll();
    });

    $('#active').on('click', function () {
        getActive();
    });

    $('#completed').on('click', function () {
        getCompleted();
    });

    $('#clear-completed').on('click', function () {
        clearCompleted();
    });
});

function displayPosition(position) {
    alert("Широта: " + position.coords.latitude + ", Долгота: " + position.coords.longitude + position);
}

function test()
{
    var newData = '';
    var data = 'name';
    var value1;
    value1 = function () {
        newData = data + data;  // Обращение к переменной из анонимной ф-и, изменение содержимого внешней переменной
        $('#input-val').val(newData);
    };
    value1();
    // alert(newData);
}


function actionWithInput() {
    var inputText = $('#input-val').val();
    if (inputText) {
        if ($('.filters').hasClass('hide')) {
            $('.filters').show();
            $('.filters').removeClass('hide');
            $('.filters').addClass('show');
            if($('.list-row .row-num-1'))
            {
                // getFirstRowList(inputText);  // создать первый элемент списка
                getNextRowToList(inputText);
            }
        }
        else if ($('.filters').hasClass('show'))
        {
            getNextRowToList(inputText);
        }
        $('#input-val').val('');  // Присвоить пустое значение строке ввода
    }
}


function checkboxControl() {
    var boxes = $("input:checkbox");
    $("input:checkbox").on("change", function(){
        var theArray = [];
        for (var i=0; i<boxes.length; i++) {
            var box = boxes[i];
            if (!$(box).prop('checked')) {
                theArray[theArray.length] = $(box).val();
            }
        }
        showValues(theArray);
    });

    var showValues = function(array) {
        var text = "";
        if(array.length == 0) {
            text += "0 item left";
        }
        for(var n = 1; n <= array.length; n++) {
            text = n + " item left";
        }
        // console.log('name');
        if(array.length < boxes.length)
        {
            $('#clear-completed').css('visibility', 'visible');
        }
        else if(array.length == boxes.length)
        {
            $('#clear-completed').css('visibility', 'hidden');
        }
        $(".item-value").val(text);
    }
}


function checkboxText(e)
{
    var className = e.target.className;
    // console.log(className);

    var classStr = className.split(' ');
    if(classStr[2]) {
        var classNum = classStr[2].split('-');
        var n = classNum[2];
        if (classNum[2]) {
            if ($('.checkbox-val-' + n).prop('checked') && $('.list-value-' + n).css('text-decoration', '')) {
                $('.list-value-' + n).css('text-decoration', 'line-through');
            }
            else
            {
                $('.list-value-' + n).css('text-decoration', '');
            }
        }

    }
}


function getAll()
{
    var boxes = $("input:checkbox");
    for (var i=0; i<boxes.length; i++) {
        var box = boxes[i];
        var classNum = $(box).attr('class').split(' ')[2].split('-')[2];
        $('.row-num-' + classNum).show();
    }
}

function getActive()
{
    var boxes = $("input:checkbox");
    getAll();
    for (var i=0; i<boxes.length; i++) {
        var box = boxes[i];
        if ($(box).prop('checked')) {
            var classNum = $(box).attr('class').split(' ')[2].split('-')[2];
            $('.row-num-' + classNum).hide();
        }
    }
}

function getCompleted()
{
    var boxes = $("input:checkbox");
    getAll();
    for (var i=0; i<boxes.length; i++) {
        var box = boxes[i];
        if (!$(box).prop('checked')) {
            var classNum = $(box).attr('class').split(' ')[2].split('-')[2];
            $('.row-num-' + classNum).hide();
        }
    }
}

function clearCompleted()
{
    var boxes = $("input:checkbox");
    var n = 0;
    for (var i=0; i<=boxes.length; i++) {
        var box = boxes[i];
        if ($(box).prop('checked')) {
            var classNum = $(box).attr('class').split(' ')[2].split('-')[2];
            $('.row-num-' + classNum).remove();
            n++;
        }
        if(boxes.length == n)
        {
            if ($('.filters').hasClass('show')) {
                // alert('name');
                $('.filters').hide();
                $('.filters').removeClass('show');
                $('.filters').addClass('hide');
            }
        }
    }
}

function getDeleteButton(e)
{
    var className = e.target.className;

    var classStr = className.split(' ');
    if(classStr[2])
    {
        var classNum = classStr[2].split('-')[2];
        if(classNum)
        {
            $('.row-num-' + classNum).mouseover(function () {
                $('.del-button-' + classNum).css('visibility', 'visible');
            });

            $('.row-num-' + classNum).mouseout(function () {
                $('.del-button-' + classNum).css('visibility', 'hidden');
            });

            $('.del-button-' + classNum).on('click', function () {
                var boxes = $("input:checkbox");
                for (var n = boxes.length; n >= boxes.length; n--) {
                    if (n == 0) {
                        if ($('.filters').hasClass('show')) {
                            $('.filters').hide();
                            $('.filters').removeClass('show');
                            $('.filters').addClass('hide');
                        }
                    }
                    else
                    {
                        $('.checkbox-val-' + classNum).prop('checked', true);
                        $('.checkbox-val-' + classNum).change();
                        // checkboxControl();
                        // clearCompleted();
                        $('.row-num-' + classNum).remove();
                    }
                }
            });
        }
    }
}


function getNextRowToList(inputText)
{
    var i = 1;
    while($('.list-row').hasClass('row-num-' + i))
    {
        i++;
    }
    if (!$('.list-row').hasClass('row-num-' + i))
    {
        addNewRows(i, inputText);
        $('.list-value').attr("disabled","disabled");

        var boxes = $("input:checkbox");
        for(var n = 0; n < boxes.length; n++) {
            text = n + 1 + " item left";
        }
        $(".item-value").val(text);
    }
}

function addNewRows(i, inputText)
{
    var newRow ='<div class="column list-row row-num-' + i + '">' +
        '<input type="checkbox" class="checkbox checkbox-completed checkbox-val-' + i + '" value="">' +
        '<div class="div-input"><input type="text" class="input-value list-value list-value-' + i + '" value=""></div>' +
        '<input type="button" value="X" class="btn btn-danger delete-button del-button-' + i + '">' +
        '</div>';
    $('#list-content').append(newRow);
    $('.list-value-' + i).val(inputText);
}


// function getDeleteButton()
// {
//     var name = $('.list-row').mouseover(function (e){
//         var className = e.currentTarget.className;
//
//     });
//
//     alert(name);
//
//     if(name)
//     {
//         $(className).mouseover(function () {
//             $('.del-button-' + i).css('visibility', 'visible');
//             });
//
//         $(className).mouseout(function () {
//             $('.del-button-' + i).css('visibility', 'hidden');
//         });
//     }

    // var count = $('.list-row').length;
    // var i = 1;
    // // alert(count);
    // for(i; i <= count; i++)
    // {
    //     // if ($('.row-num-' + i).mouseout(function () {
    //     //         return true;
    //     //     })) {
    //         if ($('.row-num-' + i).mouseover(function () {
    //                 return true;
    //             })) {
    //     //         alert(i);
    //             $('.row-num-' + i).mouseover(function () {
    //                 // alert(i);
    //                 // alert(count);
    //                 $('.del-button-' + i).css('visibility', 'visible');
    //             });
    //
    //             $('.row-num-' + i).mouseout(function () {
    //                 $('.del-button-' + i).css('visibility', 'hidden');
    //             });
    //         }
    //     // }
    // }
// }


function getDeleteButton2() {
    // var boxes = $("input:text");
    // $("input:text").mouseover(function () {
    //     $('.delete-button').css('visibility', 'visible');
    // });
    // $("input:text").mouseout(function () {
    //     $('.delete-button').css('visibility', 'hidden');
    // });
    var boxes = $("input:text");
    $("input:text").mouseover(function () {
        var theArray = [];
        for (var i = 1; i < boxes.length -1; i++) {
            var box = boxes[i];
            // alert(i);
            if ($(box).attr('id') == null) {
                theArray[theArray.length] = $(box).attr('id', i + '-list');
            }
        }
        // $("input:text").mouseover(function () {
        //     $('.delete-button').css('visibility', 'visible');
        // });
        // $("input:text").mouseout(function () {
        //     $('.delete-button').css('visibility', 'hidden');
        // });
        // alert(i);
        // showValues(theArray);
        // });
    });
}

/**
 * For first row list (don`t use)
 * @param inputText
 */
function getFirstRowList(inputText)
{
    $('.list-value').addClass('list-value-1');
    $('.list-value-1').val(inputText);
    $('.list-value-1').attr("disabled","disabled");
    $('.checkbox-completed').val('checkbox-val-1');  // Если класс одинаковый, то применимо ко всем элементам с таким классом
    $('.delete-button').addClass('del-button-1');
}

/**
 * Получение нового элемента для list-content без html
 */
// function addNewRows(numList) {
//     var i = numList + 1;
//     var j = numList + 2;
//     // alert(j);
//     var obj = $("#list-content").children('.list-row');
//     for (var key in obj) {
//         alert("Ключ: " + key + " значение: " + obj[key]);
//     }
//     // $('.row-num-' + numList).removeClass('row-num-' + i);
//     // $('.row-num-' + i).removeClass('row-num-' + numList);
//     var list = $('.row-num-' + numList).get(0).outerHTML;  // Получение кода элемента
//     var checkbox = $('.checkbox-' + numList).get(0).outerHTML;  // Получение кода элемента
//     var listValue = $('.list-value-' + numList).get(0).outerHTML;  // Получение кода элемента
//     var deleteButton = $('#del-button-' + numList).get(0).outerHTML;  // Получение кода элемента
//
//     // var labelList = elem.getAttribute('class');
//     // alert(checkbox);
//     // alert(list);
//     $('#list-content').append(list);
// }



















