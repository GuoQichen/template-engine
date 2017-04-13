const compile = require('../index.js').compile
const should = require('should')

describe('test/index.test.js', () => {
	it('compile should return function', () => {
		compile('hello').should.be.a.Function
	})

	it('compile shoud resovle <%= variable %> to string', () => {
		compile('hello <%= this.name %>')({ name: 'guo' }).should.be.type('string')
	})

	it('compile should resolve <%= variable %> with argument', () => {
		compile('hello <%= this.name %>')({ name: 'guo' }).should.equal('helloguo')
	})

	it('compile should resolve <% for loop %> with argument', () => {
		compile(`
			todos is:
			<% for(let i = 0; i < this.todos.length; i++) { %>
			<%= this.todos[i] %>
			<% } %>
		`)({ todos: ['sleep', 'eat', 'work']}).should.equal('todos is:sleepeatwork')
	})

	it('compile should resolve <% if %> with argument', () => {
		compile(`
			hello 
			<% if(true) { %>
			<%= 'world' %>	
			<% } %>
		`)().should.equal('helloworld')
	})
})
