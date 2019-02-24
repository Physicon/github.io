	$(document).ready(function(){

		// READY
		var url = 'http://krapipl.imumk.ru:8082/api/mobilev1/update';
		var params = {};
		params.data='';
		// console.log(params);

$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		data: params,
		success: function(data){
			console.log('success');
			console.log(data);


			for(var i=0; i<data.items.length; i++){

				// params

			var courseHash = data.items[i].courseHash;
			var courseId = data.items[i].courseId;
			var description = data.items[i].description;
			var extId = data.items[i].extId;
			var genre = data.items[i].genre;
			var google_id = data.items[i].google_id;
			var grade = data.items[i].grade;
			var isNew = data.items[i].isNew;
			var itunes_id = data.items[i].itunes_id;
			var lang = data.items[i].lang;
			var priceBonus = data.items[i].priceBonus;
			var progress = data.items[i].progress;
			var price = data.items[i].price;
			var requireUpdate = data.items[i].requireUpdate;
			var shopUrl = data.items[i].shopUrl;
			var size = data.items[i].size;
			var status = data.items[i].status;
			var subject = data.items[i].subject;
			var title = data.items[i].title;
			var winstore_id = data.items[i].winstore_id;


			// create items
			var $ul = $('.js-items');
			$ul.append('<li class="courses-sci" data-item="'+i+'"></li>');
			var $li = $ul.children('li[data-item="'+i+'"]');


			$li.append('<div class="sci-figure"></div>');

			// images in items, delete later
			$li.children('.sci-figure').html('<img alt = "'+subject+'" src ="images/'+subject+'.jpeg">')
			// images in items, delete later


			$li.append('<div class="sci-info"></div>');
			var $liInfo = $li.children('.sci-info');

			$liInfo.append('<p class="sci-title">'+subject+'</div>');


			var semicolon = grade.indexOf(';');
			if (semicolon>=0){
				grade = grade.split(';');
				grade = grade +' классы';
			}
			else{
				grade = grade +' класс';

			}

			$liInfo.append('<p class="sci-grade">'+grade+'</div>');
			$liInfo.append('<p class="sci-genre">'+genre+'</div>');
			$liInfo.append('<p class="sci-meta"><a href="'+shopUrl+'">Подробнее</a></p>');

// input hidden
			function addInputHidden(id, val){
				$li.append('<input type="hidden" id="'+id+'" value="'+val+'"/>');
			}
			addInputHidden('input-rub', price);
			addInputHidden('input-bonus', priceBonus);
			addInputHidden('input-subject', subject);
			addInputHidden('input-genre', genre);
			addInputHidden('input-grade', grade);
			addInputHidden('input-title', title);


// default currency
			var $currency = $('#currency');

				var val = $currency.val();

				if(val=='1'){
					$liInfo.append('<p class="sci-controls"><span class="pure-button pure-button-primary btn-fluid" href="#">'+price+' руб.</span></p>');

				}
				else if(val=='2'){
					$liInfo.append('<p class="sci-controls"><span class="pure-button pure-button-primary btn-fluid" href="#">'+priceBonus+' бонусов.</span></p>');

				}

		}



// CHANGE CURRENCY
	$currency.on('change', function(){
		var val = $(this).val();

$ul.children('li').each(function(){
	var that = $(this);
	var $liInfo = that.children('.sci-info');
	var price = that.children('#input-rub').val();
	var priceBonus = that.children('#input-bonus').val();
	$liInfo.children('.sci-controls').remove();

			if(val=='1'){
				$liInfo.append('<p class="sci-controls"><span class="pure-button pure-button-primary btn-fluid" href="#">'+price+' руб.</span></p>');

		}
		else if(val=='2'){
			$liInfo.append('<p class="sci-controls"><span class="pure-button pure-button-primary btn-fluid" href="#">'+priceBonus+' бонусов.</span></p>');

		}

});
	});

	// FILTERS
function filterParam(el, par){
var that = $(el);
var opt = that.children('option:selected');
textOpt = opt.text();
textOpt = String(textOpt);
// if(!textOpt.match(/^\d+$/)){
textOpt = textOpt.toLowerCase();
	
// }

textOpt = $.trim(textOpt);
if(textOpt.indexOf('все')>=0){
$ul.children('li').removeClass('hidden-'+par);
return
}



$ul.children('li').addClass('hidden-'+par);
$ul.children('li').each(function(){
	var thatLi = $(this);
	var filterVal = thatLi.children('#input-'+par+'').val();
	filterVal = String(filterVal);
// if(!filterVal.match(/^\d+$/)){
	filterVal = filterVal.toLowerCase();
// }
	filterVal = $.trim(filterVal);

// IF THE PARAMETER OF GRADE IS CHANGED
	if(par == 'grade'){
		// if grade == 1
		if(textOpt == '1'){
			console.log('select 1')
			textVersion1 =  textOpt+' ';
			textVersion2 = textOpt+',';
		if(filterVal.indexOf(textVersion1)>=0 || filterVal.indexOf(textVersion2)>=0){
			if(filterVal[filterVal.indexOf(textVersion1)-1] !== '1'){
		thatLi.removeClass('hidden-'+par);


			}

		}

		}
		// if grade !== 1

		else{
					if(filterVal.indexOf(textOpt)>=0){

		thatLi.removeClass('hidden-'+par);

		}

		}


	}

// IF ANY OTHER PARAMETER CHANGED
	else{
			if(filterVal == textOpt){
		thatLi.removeClass('hidden-'+par);
	}
	}




})


}

// SEARCH

function searchItems(){
	// debugger;
	var inputVal = $('#search').val();
	inputVal = $.trim(inputVal);
	inputVal = inputVal.toLowerCase();
	$ul.children('li').addClass('hidden-search');

	$ul.children('li').each(function(){
		var that = $(this);
		var text = that.children('#input-title').val();
		text = text.toLowerCase();
		var result = text.indexOf(inputVal);

		var textGrade = that.children('#input-grade').val();
		textGrade = textGrade.toLowerCase();
		var resultGrade = textGrade.indexOf(inputVal);
		if(result>=0 || resultGrade>=0){
			that.removeClass('hidden-search');
		}

	})
}

$('#subj').on('change', function(){
filterParam(this, 'subject');
});
$('#genre').on('change', function(){
filterParam(this, 'genre');
});
$('#grade').on('change', function(){
filterParam(this, 'grade');
});
$('#search-items').on('click', function(){
searchItems();
})

		
		},
		error: function(){
			console.log('error');
		}
	});


	});
	
