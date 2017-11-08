import React, { Component } from "react";
import User from "./User";
import "./UserList.css";

class UserList extends Component {
  
    render(){
        const {handleSort} = this.props;
        const users = this.props.users.map((user, i) => (
          <User key={user.id} {...user} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
        ));
        
        return (
            <div className="user-list">
                <div className="table-header">
                    <div className="header-name" onClick={()=>handleSort("name")}>
                        Name
                    </div>
                    <div className="header-email" onClick={()=>handleSort("email")}>
                        E-mail address
                    </div>
                    <div className="header-number" onClick={()=>handleSort("number")}>
                        Phone number
                    </div>
                </div>
                {users}
            </div>
        );
    }
}

export default UserList;