class Temp {
	compile(str) {
		const r = /<%=?\s*([^%>]+?)\s*%>/g
		let indexBefore = 0
		let match = null
		let temp = `let str = ''`
		const addCode = (str, isOutput) => isOutput ? temp += `\nstr+=${str}` : temp += `\n${str}`
		const addStr = str => temp += `\nstr+='${str}'`
		while(match = r.exec(str)) {
			const betweenStr = str.substring(indexBefore, match.index).trim()
			betweenStr !== '' && addStr(betweenStr, true)
			;/^<%=/.test(match[0]) ? addCode(match[1],true) : addCode(match[1])
			indexBefore = match.index + match[0].length
		}
		temp += `\nreturn str`
		// console.log(temp)
		return (data) => {
			return new Function(temp).apply(data)
		}
	}
}



module.exports = new Temp()