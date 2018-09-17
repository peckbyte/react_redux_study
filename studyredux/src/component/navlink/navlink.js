import React,{Component} from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
@withRouter
class NavLink extends Component{
    static propTypes={
        data: PropTypes.array.isRequired
    }
    render(){
        console.log('navlink')
        const {pathname} = this.props.location
        const navList =this.props.data.filter(v=>!v.ishide)
        return(
            <TabBar>
                {navList.map(v=> (<TabBar.Item
                    icon={v.icon}
                    title={v.text}
                    key={v.text}

                    icon={{uri:require(`./img/${v.icon}.png`)}}
                    selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                    selected = { pathname === v.path }
                    onPress={() => {
                        this.props.history.push(v.path)
                    }}
                    >

                    </TabBar.Item>)

                )}
            </TabBar>
        )
    }
}

export default NavLink