const Temp = require('../index.js')
const should = require('should')

const render = (new Temp()).render

describe('test/index.test.js', () => {
	it('render should return function', () => {
		render('hello').should.be.a.Function
	})

	it('render shoud resovle <%= variable %> to string', () => {
		render('hello <%= name %>')({ name: 'guo' }).should.be.type('string')
	})

	it('render should resolve <%= variable %> with argument', () => {
		render('hello <%= name %>')({ name: 'guo' }).should.equal('helloguo')
	})

	it('render should resolve <% for loop %> with argument', () => {
		render(`
			todos is:
			<% for(let i = 0; i < obj.todos.length; i++) { %>
			<%= todos[i] %>
			<% } %>
		`)({ todos: ['sleep', 'eat', 'work']}).should.equal('todos is:sleepeatwork')
	})

	it('render should resolve <% if %> with argument', () => {
		render(`
			hello 
			<% if(true) { %>
			<%= 'world' %>	
			<% } %>
		`)().should.equal('helloworld')
	})
})
