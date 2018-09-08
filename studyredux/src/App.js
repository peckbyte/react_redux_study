import React from 'react'

class Count extends React.Component{
    render() {
        const {
            store,
        } = this.props

        const { addDATA } = this.props
        const { removeDATA } = this.props

        const num = store.getState()
        return (
            <div>
                <h1>数值是：{num}</h1>
                <button onClick={() => store.dispatch(addDATA())}  id = "add">增加数值</button>
                <button onClick={() => store.dispatch(removeDATA())}  id = "remove">减少数值</button>,
            </div>


            )
    }
}



export default Count