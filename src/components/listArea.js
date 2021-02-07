import React, {Component} from 'react';
import apiList from '../api/list';
import List from './list';

class ListArea extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            gridData:[],
            usernames:[],
        }
        this.onTextChange= this.debounce(this.filterByText, 250);

    }
    filterByText=(e)=>{
        const value = e.target.value;
        this.setState((prevState)=>({gridData:prevState.data.filter(g=>(g.username.includes(value) || g.id==value || g.phone.includes(value) || g.name.includes(value) ))}))

    }
     componentDidMount() {
        const url ='/users';
            apiList.get(url).then((response)=>{
            const usernames =response.data.map((n)=>{
                return n.username;
            })
            this.setState({
                data: response.data,
                gridData: response.data,
                usernames,
            })
        })
    }
     listOnChange=(username)=>{
        this.setState((prevState)=>({gridData:prevState.data.filter(g=>(g.username==username))}))
     }

     debounce=(func, wait, immediate)=> {
        let timeout;
        return function() {
            let context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }
    render() {
        console.log(this.state.gridData);
        return (
            <div>
                <p className="ml-5">{this.state.data.length} result</p>
                    <List onChange={this.listOnChange} usernames={this.state.usernames} />
                    <table>
                      <thead>
                      <tr>
                          <th>
                              User id
                          </th>
                          <th>
                          User name
                          </th>
                          <th>
                              Name
                          </th>
                          <th>
                              Phone
                          </th>

                      </tr>
                      </thead>
                        <tbody>
                        {this.state.gridData.map((n)=>{
                            return (
                                <tr>
                                    <td> {n.id} </td>
                                    <td> {n.username} </td>
                                    <td> {n.name} </td>
                                    <td> {n.phone} </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                <br/>
                <input onChange={this.onTextChange} type="text"/>
            </div>
        );
    }
}

export default ListArea;