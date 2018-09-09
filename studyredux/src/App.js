import React from 'react'
import { connect } from 'react-redux'
import { addDATAasync, addDATA, removeDATA, getUser } from './index.redux'

@connect(
    state => state.counter ,
    {addDATA, addDATAasync, removeDATA, getUser}
)

class Count extends React.Component{
    componentDidMount() {
        this.props.getUser()
        console.log(this.props)
    }

    render() {
        // console.log(this.props)
        const {
            addDATA,
            addDATAasync,
            removeDATA,
            num,
        } = this.props

        return (
            <div >
                <h1>姓名：{this.props.name}</h1>
                <h1>工作：{this.props.job}</h1>

                <h1>数值是：{num}</h1>
                <button onClick={addDATA}  id = "add">增加数值</button>
                <button onClick={addDATAasync}  id = "add">2秒后数值</button>
                <button onClick={removeDATA}  id = "remove">减少数值</button>,
            </div>

            )
    }
}


export default Count