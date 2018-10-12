$( document ).ready(function() {
	$('textarea').val('');
	$('textarea').focus();
	$(".evalBtn").on("click", function () {
		$('textarea').focus();
		var allExprs = $("textarea").val().replace(/(\r\n\t|\n|\r\t)/gm,"")
		if (allExprs !== "") {
			$("table").empty();
			allExprs = allExprs.split(",");
			// Call customEvalExpr made in eval.js
			// All business logic is in eval.js file
			var allVaues = customEvalExpr(allExprs);
			var $table = $('table');
			$('.finalHeader').css("opacity", "1");
			var smallestValue = allVaues.concat().sort(function(a,b){return a - b})[0];
			$("<tr><th>Expression</th><th>Result</th></tr>").appendTo($table);
			for (i in allExprs) {
				var $tr = $("<tr><td>"+ allExprs[i] +"</td><td>"+ allVaues[i] +"</td> </tr>");
				if (smallestValue === allVaues[i]) {
					$tr.css("background", 'red');
				}
				$tr.appendTo($table);
			}
		}
	})
});