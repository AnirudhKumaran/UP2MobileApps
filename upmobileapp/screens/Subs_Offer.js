import React,{Component} from 'react';
import {  Text, View, Picker, 
          TouchableOpacity, Image, FlatList, 
          Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import './styles'
import './actions/Subs_Offer'
import Actions from './actions/Subs_Offer';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      apiData: [],
      naData: [],
      facData: [],
      dataId: null,
      start_date: '',
      end_date: '',
      checked: false,
      selected_hour:"Select Hour",
      cb_enable:true,
    }
  }

  button(soid) {
    Alert.alert(
      'Delete !',
      'Are you sure ?',
      [
        {text: 'NO', onPress: () => {return}, style: 'cancel'},
        {text: 'YES', onPress: () => {  Actions.delete_act({soid})
                                        this.reset_btn()
                                        alert('Offer(s) Deleted')  }},
      ]
    );
  }

  add_action = () => {
    Actions.saveButton(this.state.start_date,this.state.end_date,this.state.checked,this.state.selected_hour)
    alert('Offer(s) Added')
    this.reset_btn()
  }

  reset_btn = async () => {
    this.setState({
      start_date:'',
      end_date:'',
      checked:false,
      selected_hour:"Select Hour",
      apiData: await Actions.fetchData(),
      cb_enable:true
    })
  }

  componentDidMount(){
    this.setState({
        apiData: Actions.fetchData(),
        facData: Actions.teacherData(this.state.start_date)
    })
  }

  render(){

    return (
      <View style={styles.container}>
        
        <DatePicker
          style={styles.input}
          date={this.state.start_date}
          mode="date"
          placeholder="From Date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({start_date: date})
                                    this.teacherData(this.state.start_date)
                                    if(this.state.end_date!=''){
                                      this.setState({checked: true,selected_hour:"Select Hour",cb_enable:false})
                                     }
                                  }}
        />

        <DatePicker
          style={styles.input}
          date={this.state.end_date}
          mode="date"
          placeholder="To Date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({end_date: date})
                                   if(this.state.start_date!=''){
                                    this.setState({checked: true,selected_hour:"Select Hour",cb_enable:false})
                                   }}}
        />

        <CheckBox
          title='Entire Day'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
          containerStyle={{
            marginBottom:14,
            marginTop:14,
            width: '90%'
          }}
          enabled={this.state.cb_enable}
          onPress={() => this.setState({checked: !this.state.checked,selected_hour:"Select Hour"})}
        />

          <Picker
            selectedValue={this.state.selected_hour}
            onValueChange={(itemValue, itemIndex) => {this.setState({selected_hour: itemValue})}}
            enabled={!this.state.checked}
            style={
              {
                width: '90%',
              }
            }>
            <Picker.Item label="Select Hour" value="Select Hour" key={0} selected />  
            { this.state.facData.map((item, key)=>(
            <Picker.Item label={item.hr_no} value={item.hr_no} key={key+1} />)
            )}
          </Picker>
  
          <View style={styles.button_container}>
            <View style={styles.add_button}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.add_action()}>
                <Image
                source={require('./icons_sets/plus.png')}
                style={styles.ImageIconStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.del_button}>
              <TouchableOpacity activeOpacity={0.5}>
                <Image
                source={require('./icons_sets/trash-alt.png')}
                style={styles.ImageIconStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.res_button}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.reset_btn}>
                <Image
                source={require('./icons_sets/redo-alt.png')}
                style={styles.ImageIconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.listview}>
            <FlatList
              data={this.state.apiData}
              renderItem={({item}) => 
              <TouchableOpacity onPress={() => this.button(item.soid)} style={styles.listitem}>
                <View style={styles.text_container}>
                  <Text style={{textAlign:'left',width:'50%',color:'blue',fontSize:20,fontWeight:'bold'}}>{item.soid}</Text>
                  <Text style={{textAlign:'right',width:'50%',color:'orange',fontSize:18}}>{item.date.split("-").reverse().join("-")}</Text>
                </View>
                <View style={styles.text_container}>
                  <Text style={{textAlign:'left',width:'50%',color:'green',fontSize:16}}>{item.cid}</Text>
                  <Text style={{textAlign:'right',width:'50%',fontSize:16}}>{item.hrid}</Text>
                </View>
              </TouchableOpacity>}
            />
          </View>

      </View>
    );

  }

}