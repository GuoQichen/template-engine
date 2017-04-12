class Temp {
	render(str) {
		const r = /<%=?\s*([^%>]+?)\s*%>/g
		let indexBefore = 0
		let indexAfter = 0
		let match = null
		let temp = `let str = ''`
		while(match = r.exec(str)) {
			indexAfter = match.index
			const betweenStr = str.substring(indexBefore, indexAfter).trim()
			if(betweenStr) temp += `\nstr += '${betweenStr}'`
			if(/^<%(?!\=)/.test(match[0])) {
				temp += `\n${match[1]}`
			} else if (/^<%=/.test(match[0])) {
				temp += `\nstr += obj.${match[1]}`
			}
			indexBefore = indexAfter + match[0].length
		}
		temp += `\nreturn str`
		// console.log(temp)
		return new Function('obj', temp)
	}
}


module.exports = Temp