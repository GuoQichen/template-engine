# template-engine
simply template-engine

## Usage
```
const compile = require(./template-engine).compile
cosnt templateString = 
`
	<% if (this.name) {%>
	<h1>hello <%= this.name %></h1>
	<% } %>
	<h2>today todos:</h2>
	<ul>
	<% for(let i = 0; i < this.todos.length; i++) {%>
	<li><%= this.todos[i] %></li>
	<% } %>
	</ul>
`
compile(templateString)({ name: 'guo', todos: ['sleep', 'eat', 'work']})
```

then result will be:

```
`
	<h1>hello guo</h1>
	<h2>today todos:</h2>
	<ul>
		<li>sleep</li>
		<li>eat</li>
		<li>work</li>
	</ul>

`
```

## Test
```
npm test
```