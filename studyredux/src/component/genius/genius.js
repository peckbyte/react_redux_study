import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getuserlist} from '../../redux/user/getUserList';
import InfoList from '../infoList/infoList'

@connect(state => state.userList,
    {getuserlist}
)
class Genius extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getuserlist('boss')
    }


    render() {
        return (
            <InfoList userList={this.props.list}/>
        )
    }
}

export default Genius