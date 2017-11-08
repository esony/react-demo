import React, { Component } from "react";
// import Proptypes from "prop-types";
import "./User.css";

class User extends Component {
    constructor(props){
        super(props);
        const {name, email, number} = props;
        this.state = {
            edit: false,
            name: name,
            email: email,
            number: number
        };
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    editing() {
        this.setState({edit: true});
    }
    
    cancel = e => {
        e.preventDefault();
        this.setState({edit: false});
    }
    
    onSave = e => {
        e.preventDefault();
        const {id, onEdit} = this.props;
        const {name, email, number} = this.state;
        this.setState({edit: false});
        onEdit({id, name, email, number});
    }
    
    renderUser(){
        const {id, name, email, number} = this.props;
        return(
            <div className="user normal">
                <div className="name">
                    {name}
                </div>
                <div className="email">
                    {email}
                </div>
                <div className ="number">
                    {number}
                </div>
                <div className="actions">
                    <i className="material-icons" onClick={() => this.editing()}>edit</i>
                    <i className="material-icons" onClick={() => this.props.onDelete(id)}>delete</i>
                </div>
            </div>
        );
    }
    
    render(){
        const {name, email, number} = this.props;

        return(
            // EDITING
            <div>
                { this.state.edit ?
                <EditForm 
                    name={name} 
                    email={email} 
                    number={number}
                    onSave={this.onSave}
                    onCancel={this.cancel}
                    handleChange={this.handleChange}
                /> 
                : this.renderUser()
                }
            </div>
        );
    }
}


const EditForm = (props) => {
    const {name, email, number, onCancel, onSave, handleChange} = props;
        return (
            <div className="user">
                <form className="edit-form" onSubmit={() => {}}>
                    <input
                        className="field name"
                        type="text"
                        name="name"
                        defaultValue={name}
                        autoComplete="off"
                        placeholder="Full name"
                        onChange={handleChange}
                         />
                    <input
                        className="field email"
                        type="text"
                        name="email"
                        defaultValue={email}
                        autoComplete="off"
                        placeholder="E-mail address"
                        onChange={handleChange}
                         />
                    <input
                        className="field number"
                        type="text"
                        name="number"
                        defaultValue={number}
                        autoComplete="off"
                        placeholder="Phone number"
                        onChange={handleChange}
                         />
                    <div className="actions">
                        <button className="btn cancel" onClick={(e) => onCancel(e)}>Cancel</button>
                        <button className="btn save" onClick={(e) => onSave(e)}>Save</button>
                    </div>
                </form>
            </div>
        );
};

export default User;