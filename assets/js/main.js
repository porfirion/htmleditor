var currentTag = null;

function removeCurrentTag() {
	if (currentTag != null) {
		currentTag.removeClass('currentTag');
		currentTag[0].contentEditable = false;
	}
}

function showTagOnPanel(tag) {
	var panel = $('#panel');
	var rects = tag[0].getClientRects();
	panel.empty();
	panel.append('<h2>' + tag[0].tagName + '</h2>');
	var html = '<div';
	html += '<h3>Client rects ('+rects.length+')</h3>';
	for (var i = 0; i < rects.length; i++) {
		html += '<div>';
		html += rects[i].width + '*' + rects[i].height;
		html += ' (' + rects[i].top + ';' + rects[i].left + ';' + rects[i].bottom + ';' + rects[i].right + ';' + ')'
		html += '</div>';
	}
	html += '</div>'
	panel.append(html);
	console.log(tag[0].getClientRects());
}

$(document).ready(function() {
	console.log('hello!');
	$(document).on('click', 'body:not(#panel, #panel *)', function(event) {
		if ($(this).is('body, #panel, #panel *')) {
			// проверить event target
		}
		removeCurrentTag();
	});
	$(document.body).on('click', '.htmleditor *:not(#panel, #panel *)', function(event) {
		console.log('tag click');
		removeCurrentTag();

		currentTag = $(this);
		currentTag.addClass('currentTag');

		currentTag[0].contentEditable = true;
		currentTag[0].focus();

		showTagOnPanel(currentTag);

		event.preventDefault();
		return false;
	});
});
