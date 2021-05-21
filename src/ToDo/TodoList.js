import React, { Component } from 'react';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            items: []
        };
        this.fetch()
    }
    
    
    async fetch() {
        const response = await fetch('https://todo-list-ellistat-default-rtdb.europe-west1.firebasedatabase.app/list/list.json');
        const data = await response.json();
        this.setState({
            items: data
        })
    }
    save() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ list: this.state.items })
        };
        fetch('https://todo-list-ellistat-default-rtdb.europe-west1.firebasedatabase.app/list.json', requestOptions)
        console.table(this.state.items);
    }

    onChange(event) {
        this.setState({
            userInput: event.target.value
        });
    }

    addTodo(event) {
        event.preventDefault();
        let value = [false, this.state.userInput, false, `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`]
        if (this.state.items == null){
            this.setState({
                userInput: '',
                items: [value]
            })
        }else{
            this.setState({
                userInput: '',
                items: [...this.state.items, value]
            });
        }
        setTimeout(() => {
            this.save()
        }, 1);
    }


    deleteTodo(item) {
        const array = this.state.items;
        const index = array.indexOf(item);
        array.splice(index, 1)
        this.setState({
            items: array
        });
        this.save()
    }

    tickTodo(item){
        const array = this.state.items;
        const index = array.indexOf(item);
        if (array[index][0]){
            array[index][0] = false
        }else{
            array[index][0] = true
        }
        this.setState({
            items: array
        });
        this.save()
    }

    renderTodos() {
        return this.state.items.map((item) => {
            return (
                <div className="list-group-item" key={item}>
                    <button onClick={this.tickTodo.bind(this, item)}>{item[0] ? '☑' : '◻'}</button><span className={item[0] ? 'barré' : null}>{item[1]}</span><br/><span>{item[3]}</span> <button onClick={this.deleteTodo.bind(this, item)}>Delete</button>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="titre">
                    <h1>Todo list en React - Ellistat</h1>
                    <p>Marius Proton</p>
                </div>
                <div className="carte">
                    <form className="form-row align-items-center">
                        <input
                            value={this.state.userInput}
                            type="text"
                            placeholder="New Task"
                            onChange={this.onChange.bind(this)}
                            className="form-control mb-2"
                        />
                        <button
                            onClick={this.addTodo.bind(this)}
                            className="btn btn-primary"
                        >
                            Ajouter
                        </button>
                    </form>
                    <div className="list-group">
                        {this.state.items != null ? this.renderTodos() : "this list is empty"}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;