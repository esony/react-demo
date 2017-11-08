import React, { Component } from "react";
import "./AddNew.css";

class AddNew extends Component {
    static defaultProps = {
        onSave() {}
    }
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            number: ""
        };
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSave({...this.state});
        this.setState({
          name: '',
          email: '',
          number: ''
        });
    }
    
    render(){
        const {name, email, number} = this.state;
        return(
            <div id="addnew-container">
                <form className="user-form" onSubmit={this.handleSubmit}>
                    <div className="user-input">
                        <input
                            className="field name"
                            type="text"
                            name="name"
                            value={name}
                            autoComplete="off"
                            placeholder="Full name"
                            onChange={this.handleChange} />
                        <input
                            className="field email"
                            type="text"
                            name="email"
                            value={email}
                            autoComplete="off"
                            placeholder="E-mail address"
                            onChange={this.handleChange} />
                        <input
                            className="field number"
                            type="text"
                            name="number"
                            value={number}
                            autoComplete="off"
                            placeholder="Phone number"
                            onChange={this.handleChange} />
                    </div>
                    <div className="action">
                        <button type="submit" className="btn">Add new</button>
                    </div>
                        
                </form>
            </div>
        );
    }
}

export default AddNew;