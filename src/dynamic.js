import React from 'react';

export default class Dynamic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: []
        }
    }
    componentDidMount(){
        if(this.props.location.userProps !== undefined){
            this.setState({
                user:this.props.location.userProps.name
            })
        }
    }
    render() {
        console.log(this.state.user)
        return (
            <div className="dynamicMain">
                <button type="button" onClick={() => this.props.history.push('/')}>Back</button>
                <h1>{this.state.user.first_name}</h1>
                <div className="userMain"><h3 className="displayInline">Company</h3><label>{this.state.user.company_name}</label></div>
                <div className="userMain"><h3 className="displayInline">City</h3><label>{this.state.user.city}</label></div>
                <div className="userMain"><h3 className="displayInline">State</h3><label>{this.state.user.state}</label></div>
                <div className="userMain"><h3 className="displayInline">ZIP</h3><label>{this.state.user.zip}</label></div>
                <div className="userMain"><h3 className="displayInline">Email</h3><label>{this.state.user.email}</label></div>
                <div className="userMain"><h3 className="displayInline">Web</h3><label>{this.state.user.web}</label></div>
                <div className="userMain"><h3 className="displayInline">Age</h3><label>{this.state.user.age}</label></div>
            </div>
        )
    }
}