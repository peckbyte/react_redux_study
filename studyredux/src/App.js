import React from 'react'
import { connect } from 'react-redux'
import { addDATAasync, addDATA, removeDATA } from './index.redux'

// const mapStateToProps= (state) => {
//     return {num: state}
// }
//
// const actionCreate  = {addDATA, addDATAasync, removeDATA}
//
//
// Count = connect(mapStateToProps,actionCreate)(Count)

@connect(
    state => ({num: state}),
    {addDATA, addDATAasync, removeDATA}
)

class Count extends React.Component{
    render() {
        const {
            addDATA,
            addDATAasync,
            removeDATA,
            num,
        } = this.props

        return (
            <div>
                <h1>数值是：{num}</h1>
                <button onClick={addDATA}  id = "add">增加数值</button>
                <button onClick={addDATAasync}  id = "add">2秒后数值</button>
                <button onClick={removeDATA}  id = "remove">减少数值</button>,
            </div>

            )
    }
}


export default Count