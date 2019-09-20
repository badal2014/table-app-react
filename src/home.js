import React, { Component } from 'react'
import FilterData from './filterData';
import { Link } from 'react-router-dom';
import {UserConsumer} from './context';



export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataMap: [],
            pageNo: 1,
            buttons: [],
        }
    }

    componentDidMount() {
        const that = this;
        fetch('https://demo9197058.mockable.io/users')
            .then((resp) => resp.json())
            .then((resp) => {
                that.setState({ data: resp, buttons: [...Array((resp.length) / 5).keys()] })
                this.pagination(1)
            })
            .catch(function () {
            });
    }
    pagination(e) {
        var pageNo = e.target == undefined ? 1 : parseInt(e.target.value)
        if (this.state.data !== "") {
            let items = 5 * (pageNo);
            let { data } = this.state
            let fiveItems = []
            fiveItems = data.filter((v, index) => (index < items && index >= items - 5))
            this.setState({ dataMap: fiveItems })
        }
    }
    handleChange(e) {
        this.setState({ dataMap: FilterData(e.target.value, 5, this.state.data) })
    }
    filterTable(e, name) {
        var dataa = [...this.state.dataMap]
        if (e.target.value == "select") {
            this.setState({ dataMap: FilterData("", 5, this.state.data) })
        } else if (name !== "age" && name !== "zip") {
            dataa.sort((a, b) => {
                var nameA = a[name].toLowerCase(), nameB = b[name].toLowerCase()
                if (nameA < nameB) {
                    if (e.target.value == "asc") return -1
                    else return 1
                }
                if (nameA > nameB) {
                    if (e.target.value == "asc") return 1
                    else return -1
                } return 0
            })
            this.setState({ dataMap: dataa })
        }
        else {
            dataa.sort((a, b) => { if (e.target.value == "asc") { return a[name] - b[name] } else return b[name] - a[name] })
            this.setState({ dataMap: dataa })
        }
    }
    handlePropsData(data) {
        this.props.history.push({
            pathname: `/${data.id}`,
            userProps: { name: data }
        })
    }
    scrollDiv(id){
            var div = document.getElementsByClassName("pagination")
        if(id == "next"){
            div[0].scrollLeft += 95;            
        }else if(id == "prev"){
        console.log(id)
            div[0].scrollLeft -= 95; 
        }
    }
    render() {
        return (
            <div className="homeMain"><h1>Home</h1>
            {/* <UserConsumer>
            {({ username }) => <h1>Welcome {username}!</h1>}
            </UserConsumer>
                <h1>Data Peace</h1> */}
                <input type='search' placeholder="Search by first name" onChange={(e) => (this.handleChange(e))} />
                <table>
                    <thead>
                        <tr>
                            <th>
                                <select name="first_name" onChange={(e) => this.filterTable(e, "first_name")}>
                                    <option value="select">First Name</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                            <th>
                                <select name="last_name" onChange={(e) => this.filterTable(e, "last_name")}>
                                    <option value="select">Last Name</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                            <th>
                                <select name="company_name" onChange={(e) => this.filterTable(e, "company_name")}>
                                    <option value="select">Company Name</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                            <th>
                                <select name="city" onChange={(e) => this.filterTable(e, "city")}>
                                    <option value="select">City</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                            <th>
                                <select name="state" onChange={(e) => this.filterTable(e, "state")}>
                                    <option value="select">State</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                            <th>
                                <select name="zip" onChange={(e) => this.filterTable(e, "zip")}>
                                    <option value="select">ZIP</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                            <th>
                                <select name="email" onChange={(e) => this.filterTable(e, "email")}>
                                    <option value="select">Email</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                            <th>
                                <select name="web" onChange={(e) => this.filterTable(e, "web")}>
                                    <option value="select">WEB</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                            <th>
                                <select name="age" onChange={(e) => this.filterTable(e, "age")}>
                                    <option value="select">AGE</option>
                                    <option value="asc">Ascending</option>
                                    <option value="des">Descending</option>
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dataMap.map((dat, key) =>
                            <tr key={key} onClick={() => { this.handlePropsData(dat) }}><td>{dat.first_name}</td>
                                <td>{dat.last_name}</td>
                                <td>{dat.company_name}</td>
                                <td>{dat.city}</td>
                                <td>{dat.state}</td>
                                <td>{dat.zip}</td>
                                <td>{dat.email}</td>
                                <td>{dat.web}</td>
                                <td>{dat.age}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="paginationButton">
                    <button type="button" className="prevButton" onClick={() => this.scrollDiv("prev")}>Prev</button>
                    <button type="button" className="floatRight nextButton" onClick={() => this.scrollDiv("next")}>Next</button>
                </div>
                    <div className="pagination">
                        <div className="scrollDiv" id="scrollMe">
                        {this.state.buttons.map((no, key) => <button type="button" key={key} value={no + 1} onClick={(e) => this.pagination(e)}>{no + 1}</button>)}
                        </div>
                    </div>
            </div>
        )
    }
}