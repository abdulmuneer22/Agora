import React, {Component} from 'react';
import {
  Text,
  AsyncStorage,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  Alert,
  TextInput,
  Switch,
  WebView
} from 'react-native';

import EvilIcon from 'react-native-vector-icons/EvilIcons';
const { height, width } = Dimensions.get('window')
import s from './widgets/Styles'
import { Header } from './widgets/Header'

class Setting extends Component {
  render() {
    const { list,fez,navigator,updateFez } = this.props
    
    return (
      <View style={s.root}>
        {list.map((t,idx)=>{
          return (
            <TouchableOpacity key={idx} onPress={()=>{
              switch(t.title){
                case "通知":
                  navigator.push({
                    id: 'nav',
                    nav: (
                      <SetNotification 
                        repliedNoti={fez.repliedNoti}
                        updatedNoti={fez.updatedNoti}
                        navigator={navigator} 
                        updateFez={(obj)=>{
                          updateFez(Object.assign({},obj,{
                            _id: fez._id
                          }))
                        }}/>
                      )
                  })
                  break;
                case "退出":
                {
                  try {
                    AsyncStorage.removeItem('id',(error)=>{
                      
                    });
                  } catch (error) {
                    
                  }
                }
                  break;
                case "关于":
                {
                  navigator.push({
                    id: 'nav',
                    nav: (
                      <About navigator={navigator}/>  
                    )
                  })
                }
                default:
                  break;
              }
            }}>
              <View style={s.setList}>
                <Text style={[s.h4,s.deepGray]}>{t.title}</Text>
              </View>
            </TouchableOpacity>
          )
        })}        
      </View>
    );
  }
}

Setting.defaultProps = {
  list: [{
    title: '通知',
  },{
    title: '关于'
  },{
    title: '退出'
  }]
}

export default Setting;

class SetNotification extends Component {
  constructor(props){
    super(props)
    this.state = {
      repliedNoti: props.repliedNoti,
      updatedNoti: props.updatedNoti
    }
  }
  render() {
    const { navigator,updateFez } = this.props
    const { repliedNoti, updatedNoti } = this.state
    return (
      <View style={s.root}>
        <Header
          left={{
            icon: "arrow-left",
            call: ()=>{ 
              updateFez({
                repliedNoti,
                updatedNoti
              })
              navigator.pop()
            }
          }}
          />
        <View style={s.setList}>
          <Text style={[s.h4,s.deepGray]}>{"有人@我"}</Text>
          <Switch
            onValueChange={(value) => {
              this.setState({repliedNoti: value})
            }}
            style={{marginBottom: 10}}
            value={repliedNoti} />
        </View>
        <View style={s.setList}>
          <Text style={[s.h4,s.deepGray]}>{"有人回复"}</Text>
          <Switch
            onValueChange={(value) => {
              this.setState({updatedNoti: value})
            }}
            style={{marginBottom: 10}}
            value={updatedNoti} />
        </View>        
      </View>
    );
  }
}

class About extends Component {
  render() {
    const { navigator } = this.props
    return (
      <View>
        <Header
          left={{
            icon: "arrow-left",
            call: ()=>{ 
              navigator.pop()
            }
          }}
         />
        <WebView
          source={{uri: 'http://www.douban.com'}}
          style={{marginTop: 10,width: width, height: height-70}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          />
      </View>
    );
  }
}