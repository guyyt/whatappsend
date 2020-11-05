import WhatsAppLogo from './whatsApp.svg.png';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { Select } from 'semantic-ui-react'

const countryOptions = [
  { value: 'en', label:  <div><img src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" alt="EN" height="30px" width="30px" style={{marginRight: '10px'}}/>English </div>},
  { value: 'he', label:  <div><img src="https://purecatamphetamine.github.io/country-flag-icons/3x2/IL.svg" alt= "HE" height="30px" width="30px" style={{marginRight: '10px'}}/>עברית </div>}
]

const localization =  {
  header: {
    he: "לשלוח הודעה ב WhatsApp ללא הוספת איש קשר",
    en: "Send WhatsApp without new contact"
  },
  desc: {
    he: "הקלידו מספר טלפון ולחצו על הכפתור מטה, וייפתח לכם חלון באפליקציית ווצאפ עם אפשרות לשלוח הודעה",
    en: "Type the required phone number, press the button below and a new chat windows will be opened in WhatsApp app"
  },
  phone: {
    he: "הכנס מספר וואצאפ",
    en: "Enter WhatsApp number"
  },
  text: {
    he: "הכנס טקסט (אופציונאלי)",
    en: "Enter text (optional)"
  },
  sent: {
    he: "פתח שיחה באפליקציה",
    en: "Open chat in WhatsApp"
  },
  contact :{
    he: "הצעות? תקלות? צרו קשר",
    en: "Contact us here"
  }
}

class App extends React.Component  {
  constructor(){
    super();
    this.state = {lang: 'he', phone: '', text: ''};
  }

  onLangChange(event){
    if(event.target.innerText === "English"){
      this.setState({lang: 'en'})}
    else{
      this.setState({lang: 'he'})
    }
  }

  setPhone(value)
  {
    this.setState({phone: value})
  }

  onTextChange(e)
  {
    this.setState({text: e.target.value})
  }

  onClickSend(){
    if(this.state.phone === '' || !this.state.phone.startsWith('+')){
      alert("Enter Valid Number")
    }
    else{
      let phone = this.state.phone.substring(1);
      let url = `https://api.whatsapp.com/send/?phone=${phone}&text=${this.state.text}&app_absent=0`
      window.open(url, '_blank');
    }
  }

  render(){
    let dir = this.state.lang === "he" ? "rtl" : "ltr";
    return (
      <div className="App" dir={dir}>
        <header className="App-header">
        <Select dir="ltr" placeholder='Language' style={{float: 'right', minWidth: '7em'}} options={countryOptions}  onChange={this.onLangChange.bind(this)}/>
            <h1>
            {localization.header[this.state.lang]}
          </h1>
          <img src={WhatsAppLogo} className="App-logo" alt="logo" />
        </header>
        <div style={{fontSize: 'x-large'}}>
            <h2>{localization.desc[this.state.lang]}</h2>
            <div dir="ltr" style={{margin: "auto", marginBottom: '20px', width: '90%'}} > 
                  <PhoneInput
                  international
                  className="phonenumber"
                  placeholder={localization.phone[this.state.lang]}
                  value={this.state.phone}
                  defaultCountry="IL"
                  onChange={this.setPhone.bind(this)}/>
            </div>
            <div class="ui input" style={{maxWidth: '85%'}}>
            <textarea rows="4" cols="50" onChange={this.onTextChange.bind(this)} value={this.state.text} placeholder={localization.text[this.state.lang]} />
            </div>
            <div style={{marginTop: '20px'}}>
            <button primary class="ui button green" onClick={this.onClickSend.bind(this)}>{localization.sent[this.state.lang]}</button>
            </div>
        </div>
        <footer style={{marginTop:'5em'}}>
          <a href="https://www.facebook.com/locallyIL" target="_blank">{localization.contact[this.state.lang]}</a>
        </footer>
      </div>
    );
  }
}

export default App;
