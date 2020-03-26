import './Env_Var'

BASE_URL='http://'+env_var.localhost+':'+env_var.port
const Actions = {}

Actions.fetchData = async() =>{
    const response = await fetch(BASE_URL+'/offer/fetch')
    const users = await response.json()
    return users.data
  }

Actions.teacherData = async(start_date) =>{
    const response = await fetch(BASE_URL+'/offer/tfetch',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({fid:'CSF01',dno:new Date(Date.parse(start_date.split("-").reverse().join("-"))).getDay()})
    })
    const users = await response.json()
    return users.data
  }

Actions.delete_act = (sel_id) => {

    fetch(BASE_URL+'/offer/delete',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sel_id)
    }).then((responseData)=>{
      return responseData.json()
    }).then((jsonData)=>{
      console.log(this.state.naData,new Date())
    }).done()

  }

Actions.single_item = async (selected_hour,start_date) => {

    await fetch(BASE_URL+'/offer/create',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({fid:'CSF09',cid:selected_hour.split('-')[1].trim(),date:start_date,hrid:selected_hour.split('-')[0].trim()})
    }).then((responseData)=>{
      return responseData.json()
    }).then((jsonData)=>{
      console.log(jsonData)
    }).done()

  }

Actions.valdiate_fails = (start_date,end_date,checked,selected_hour) => {

    console.log(`start date : ${start_date}
                 end date : ${end_date}
                 checkbox : ${checked}
                 combobox: ${selected_hour}`)

    if(start_date==''){
      alert('Select from date!')
      return true
    }

    if(start_date!='' && selected_hour=='Select Hour'
      && !checked && end_date==''){
        alert('Select Hour!')
        return true
      }

      return false

  }

Actions.saveButton = (start_date,end_date,checked,selected_hour) => {

    if(Actions.valdiate_fails(start_date,end_date,checked,selected_hour))
      return

    if(start_date!='' && end_date==''){
      if(checked){
        console.log('call single date insert')
      }
      if(selected_hour!="Select Hour"){
        console.log('call single item insert')
      }
    }

    if(start_date!='' &&
        end_date!='' && 
        checked){
          console.log('call multiple date insert')
        }

  }

export default Actions