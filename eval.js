(function (global) {
	/**
	 * @public
	 *
	 * @param {*} allExpr all expression for evaluation
	 */
	function customEvalExpr (allExpr) {
		return new customEvalExpr.execute(allExpr)
	}

	/**
	 * @private
	 *
	 * This method is used find result of arithmetic operation
	 * @param {int} val1
	 * @param {int} val2
	 * @param {string} operator
	 */
	var _getValue = function (val1, val2, op) {
		var total;
		switch (op) {
			case "+":
				total = Number(val1) + Number(val2);
				break;
			case "-":
				total = Number(val1) - Number(val2);
				break;
			case "*":
				total = Number(val1) * Number(val2);
				break;
		}
		return total;
	}
	/**
	 * @private
	 *
	 * Evaluate and find final result of passed expression
	 * @param {string} expression
	 */
	var _mainEval = function (expr) {
		var total = 0;
		var isOpStored = false;
		var op;
		var preValue = "";
		var currentValue = ""
		for (var j in expr) {
			if (isOpStored) {
				if (expr.length === (Number(j)+1)) {
					currentValue += expr[j];
				}
				if ( isNaN( Number(expr[j]) ) || expr.length === (Number(j)+1) ) {
					preValue = _getValue(preValue, currentValue, op)
					op = expr[j];
					currentValue = "";
				} else {
					currentValue += expr[j];
				}
			} else {
				if ( isNaN( Number(expr[j]) ) ) {
					op = expr[j];
					isOpStored = true;
				} else {
					preValue += expr[j];
				}
			}
		}
		return preValue;
	}
	customEvalExpr.execute = function (allExpr) {
		var allVals = [];
		for (i in allExpr) {
			allVals.push(_mainEval(allExpr[i]));
		}
		return allVals;
	}
	global.customEvalExpr = customEvalExpr;
}) (window);