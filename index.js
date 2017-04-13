class Temp {
	compile(str) {
		const r = /<%=?\s*([^%>]+?)\s*%>/g
		let indexBefore = 0
		let match = null
		let temp = `let str = ''`
		const addCode = (str, isOutput) => isOutput ? temp += `\nstr+=${str}` : temp += `\n${str}`
		const addStr = str => { 
			const trimStr = str.replace(/\n/g, '').trim()
			if(trimStr !== '') temp += `\nstr+='${trimStr}'`
		}
		while(match = r.exec(str)) {
			addStr(str.slice(indexBefore, match.index))
			;/^<%=/.test(match[0]) ? addCode(match[1],true) : addCode(match[1])
			indexBefore = match.index + match[0].length
		}
		addStr(str.slice(indexBefore, str.length-indexBefore))
		temp += `\nreturn str`
		// console.log(temp)
		return (data) => {
			return new Function(temp).apply(data)
		}
	}
}



module.exports = new Temp()