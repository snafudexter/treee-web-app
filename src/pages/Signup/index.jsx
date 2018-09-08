import React,{ Component} from 'react';
import Select from 'react-select';
import gql from "graphql-tag";
import Alert from 'react-s-alert';
import { Mutation, Query } from "react-apollo";

const UPDATE_DATA = gql`
    mutation updateUserData($id: ID!, $age: Int, $gender: String, $qualification: ID!, $tutoringExp: Float, $profession: ID!, $classesTaught: [ID], $pricePerAnnum: Int){
        updateUserData(id: $id, age: $age, gender: $gender, qualification: $qualification, tutoringExp: $tutoringExp, profession: $profession, classesTaught: $classesTaught, pricePerAnnum: $pricePerAnnum)
        {
            id
        }
    }
`;

const CONFIRM_OTP = gql`
    mutation confirmOTP($id: ID!, $otp: String!)
    {
        confirmOTP(id: $id, otp: $otp)
        {
            id
        }
    }
`;

const RESEND_OTP = gql`
    mutation resendOTP($id: ID!)
    {
        resendOTP(id: $id)
        {
            id
        }
    }
`;


const REGISTER = gql `
  mutation register($name: String, $email: String, $phone: String)
  {
      register(name: $name, email: $email, phone: $phone)
      {
          id
      }
  }
`;

const PROFESSIONS = gql`
  query getProfessions{
      getProfessions{
          id
          name
      }
  }
`;

const QUALIFICATION = gql`
  query getQualifications{
    getQualifications{
          id
          name
      }
  }
`;

const CLASSES = gql`
  query getClasses{
      getClasses{
          id
          name
      }
  }
`;


  

class Signup extends Component
{   constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
}
    
    state = {
        sendOTPState: false,
        btn_label: 30,
        btnTimeout: 30000,
        id:"cjlrngqdk70ww0b12nz9bgock",
        step: 3,
        qualification: '',
        gender: '',     
        classes: [],
        profession: '',
        name: '',
        email: '',
        number: '',
        age: '',
        exp: '',
        resend: false,
        price: '',
        btn_state: true
    }

    componentDidMount(){
       this.timeOut();
    }

    handleClick(){
        this.setState({btn_state: true, btn_label: 'Resend OTP (' + 30 +')'});
        this.timeOut()
    }

    currentTime = 0;
    timeOut(){
        this.currentTime = 0;
        var interval = setInterval(()=>{
            this.currentTime++;
            this.setState({btn_label: 'Resend OTP (' + (((this.state.btnTimeout)/1000) - this.currentTime)+ ')'})
            

            if(this.currentTime >= (this.state.btnTimeout/1000))
            {
                this.setState({btn_label: 'Resend OTP'})
                clearInterval(this.state.intervalID);
            }
        }, 1000);
        this.setState({intervalID: interval})
        setTimeout(()=>{this.setState({btn_state: false});}, this.state.btnTimeout);
    }

    renderStep1 = () =>
    {
        return (<div className="row h-100 justify-content-center align-items-center">

            <div className="col-md-6 col-sm-12">

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: '50px'}}>
            <div className="logo">
                <img src="logo.png" width="70px" height="70px"/>    
            </div>
            <Mutation mutation={REGISTER}>
            {(register, { data }) => (
            <form style={{background: '#fff',padding: '5%', borderRadius: '10px', width:'100%'}} className="shadow-lg align-self-center" onSubmit={(e) => {
                e.preventDefault();
                this.setState({sendOTPState: true})
                register({variables:{name: this.state.name, email: this.state.email, phone: this.state.number}}).then((resp)=> {
                    this.setState({step:2, id: resp.data.register.id})
                }).catch((err)=>{
                    console.log(err)
                    if(err.graphQLErrors[0])
                    Alert.error(err.graphQLErrors[0].message, {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                    else
                    Alert.error('Something went wrong', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });

                })
            }} >
                <h2>Step 1</h2>
                <p>Please fill in this form.</p>
                <hr />
                
                <div className="form-group">
                <label for="name"><b>Name</b></label>
                <input className="form-control" type="text" placeholder="Example: John Doe" value={this.state.name} name="name" required onChange={(e) => {
                    this.setState({name: e.target.value})
                }}/>
                </div>
                <div className="form-group">
                <label for="email"><b>Email</b></label>
                <input className="form-control" type="text" placeholder="Example: xxx@xyz.com" value={this.state.email} name="email" required onChange={(e) => {
                    this.setState({email: e.target.value})
                }}/>
                </div>

                <div className="form-group">
                <label for="mobile"><b>Mobile</b></label>
                <input className="form-control" type="number" placeholder="Example: 99999 99999" value={this.state.number} name="mobile" required onChange={(e) => {
                    this.setState({number: e.target.value})
                }}/>
                </div>  

                    <hr />
                    <button className="btn btn-primary btn-block" disabled={this.state.sendOTPState} type="submit">Send OTP</button>

            </form>
            )}
            </Mutation>
            </div>
            </div>
    </div>);
    }

    renderStep2 = () => {
        return (
            <div className="row h-100 justify-content-center align-items-center">

            <div className="col-md-6 col-sm-12">

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            <div className="logo">
                <img src="logo.png" width="70px" height="70px"/>    
            </div>
            <Mutation mutation={CONFIRM_OTP}>
            {(confirmOTP, { data }) => (
            
            <form style={{background: '#fff',padding: '5%', borderRadius: '10px', width: '100%'}} className="shadow-lg align-self-center" onSubmit={(e) => {
                e.preventDefault();
                confirmOTP({variables:{id: this.state.id, otp: this.state.otp}}).then((resp)=> {
                    this.setState({step:3})
                }).catch((err)=>{
                    console.log(err)
                    if(err.graphQLErrors[0])
                    Alert.error(err.graphQLErrors[0].message, {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                    else
                    Alert.error('Something went wrong', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                })
            }}>
                <h2>Step 2</h2>
                <p>Please Confirm OTP.</p>
                <hr />
                <div className="form-group">
                <label for="email"><b>OTP</b></label>
                <input className="form-control" type="number" placeholder="Enter OTP." value={this.state.otp} name="otp" required onChange={(e) => {
                    this.setState({otp: e.target.value})
                }}/>
                </div>

                <hr />
                <Mutation mutation={RESEND_OTP}>
                {(resendOTP, { data }) => (  
                    <div className="row justify-content-around">
                    <button type="submit" className="m-1 col-lg-7 col-md-8 col-sm-12 btn btn-primary">Confirm</button>
                    <button href="#" className="m-1 col-lg-4 col-md-4 col-sm-12 btn btn-warning" 
                                     disabled={this.state.btn_state} 
                                     onClick={(e) => {
                        e.preventDefault();
                        this.handleClick(e)
                        if(!this.state.resend)
                        resendOTP({variables:{id: this.state.id}}).then((resp)=> {
                            this.setState({resend: true})
                            console.log('resent')
                        }).catch((err)=>{
                            console.log(err)
                            if(err.graphQLErrors[0])
                            Alert.error(err.graphQLErrors[0].message, {
                                position: 'top-right',
                                effect: 'slide',
                                timeout: 3000
                            });
                            else
                            Alert.error('Something went wrong', {
                                position: 'top-right',
                                effect: 'slide',
                                timeout: 3000
                            });
                        })
                    }}>{this.state.btn_label}</button>
                    </div>)}
                </Mutation>
            </form>)}
            </Mutation>
            </div>
            </div>
    </div>);
    }

    renderStep3 = () => {
        return (<div className="row h-100 justify-content-center">

        <div className="col-md-6 col-sm-12">

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px', marginBottom: '50px'}}>
        <div className="logo">
            <img src="logo.png" width="70px" height="70px"/>    
        </div>

            <Mutation mutation={UPDATE_DATA}>
            {(updateUserData, { data }) => (
        
            <form style={{background: '#fff',padding: '5%', borderRadius: '10px', width: '100%', overflow: 'auto'}} className="shadow-lg align-self-center" onSubmit={(e) => {
                e.preventDefault();

                var error = false;

                if(this.state.age == '')
                {
                    error = true;
                    Alert.error('Enter Your Age!', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }

                if(this.state.gender == '')
                {
                    error = true;
                    Alert.error('Select your Gender!', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }
                if(this.state.qualification == '')
                {
                    error = true;
                    Alert.error('Specify your Qualification!', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }

                if(this.state.exp == '')
                {
                    error = true;
                    Alert.error('Enter Your Experience (years)', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }

                if(this.state.profession == '')
                {
                    error = true;
                    Alert.error('Select your Profession!', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }

                if(this.state.classes == [])
                {
                    error = true;
                    Alert.error('Select Classes that you can teach!', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }
                if(this.state.price == '')
                {
                    error = true;
                    Alert.error('Enter price for 12 classes (per month)!', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }

                var d = {
                    id: this.state.id,
                    age: this.state.age,
                    gender: this.state.gender.value,
                    qualification: this.state.qualification,
                    profession: this.state.profession.value,
                    tutoringExp: this.state.exp,
                    classesTaught: this.state.classes.map(e => {return e.value}),
                    pricePerAnnum: this.state.price

                }

                console.log(d)
                console.log(error)
                
                if(!error)
                updateUserData({variables:d}).then((resp)=> {
                    console.log(resp)
                    this.setState({step:4})
                }).catch((err)=>{
                    console.log('error')
                    console.log(err)

                })
            }} >
                
                <h2>Step 3</h2>
                <p>Tell us more about you...</p>
                <hr />

                <div className="form-group">
                <label for="name"><b>Name</b></label>
                <input className="form-control" type="text" placeholder="Enter Name" value={this.state.name} name="name" disabled />
                </div>

                <div className="form-group">
                <label for="email"><b>Email</b></label>
                <input className="form-control" type="text" placeholder="Enter Email" value={this.state.email} name="email" disabled />
                </div>

                 <div className="form-group">
                <label for="mobile"><b>Mobile</b></label>
                <input className="form-control" type="number" placeholder="Enter Mobile No." value={this.state.number} name="mobile" disabled />
                </div>

                <hr />

                <div className="form-group">
                <label for="age"><b>Age</b></label>
                <input className="form-control" type="number" placeholder="Enter Age." value={this.state.age} name="age" autoFocus onChange={(e) => {
                    this.setState({age: e.target.value})
                }}/>
                </div>

                <div className="form-group">
                <label for="gender"><b>Gender</b></label>
                <Select
                    value={this.state.gender}
                    onChange={(val) => {this.setState({gender: val})}}
                    options={[{value: "M", label: "Male" },
                    {value: "F", label: "Female" }]}
                />
                </div>

                <hr />

                <div className="form-group">
                <label for="qual"><b>Qualification</b></label>
                <textarea className="form-control" rows={10} placeholder="Specify your qualification here in detail." name="qual" value={this.state.qualification} onChange={(e) => {
                    this.setState({qualification: e.target.value})
                }}/>
                </div>

                <hr />
                
                <div className="form-group">
                <label for="exp"><b>Tutoring Experience (years)</b></label>
                <input className="form-control"  type="number" placeholder="Enter Experience." name="exp" value={this.state.exp} onChange={(e) => {
                    this.setState({exp: e.target.value})
                }}/>
                </div>

                <div className="form-group">
                <label for="ct"><b>Profession</b></label>
                <br />

                  <Query query={PROFESSIONS}>
                    {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    var professions = data.getProfessions.map(e => ({label: e.name, value: e.id}))

                    return (
                        <Select
                            value={this.state.profession}
                            onChange={(val) => {this.setState({profession: val})}}
                            options={professions}
                        />
                    );
                    }}
                </Query>
                </div>

                <hr />

                <div className="form-group">
                <label for="ct"><b>Classes Taught</b></label>
                <br />

                <Query query={CLASSES}>
                    {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    var classes = data.getClasses.map(e => ({label: e.name, value: e.id}))

                    return (
                        <Select
                            isMulti={true}
                            value={this.state.classes}
                            onChange={(val) => {this.setState({classes: val})}}
                            options={classes}
                        />
                    );
                    }}
                </Query>
                </div>
                
                <hr />

                <div className="form-group">
                <label for="price"><b>Price for 12 Tuition Classes (per month)</b></label>
                <input className="form-control" type="number" placeholder="Enter Price." value={this.state.price} name="price" onChange={(e) => {
                    this.setState({price: e.target.value})
                }}/>
                </div>

                <hr />
                <button type="submit" className="btn btn-primary btn-block">Register</button>
               
            </form>)}
            </Mutation>
            </div>
            </div>
    </div>);
    }

    renderStep4 = () => {
        return (<div className="row h-100 align-items-center justify-content-center text-center">

        <div className="col-md-6 col-sm-12">

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginBottom: '50px'}}>
        <div className="logo">
            <img src="logo.png" width="70px" height="70px"/>    
        </div>
        <div  style={{background: '#fff',padding: '5%',paddingTop:'40px', borderRadius: '10px', width:'100%'}} className="shadow-lg align-self-center" >
        <h1>Thank you!</h1>
        <h4>We will get back to you shortly</h4>
        </div>
        </div>
        </div></div>)
    }

    render() {

        if(this.state.step == '1')
            return (<div className="container h-100">{this.renderStep1()} <Alert stack={{limit: 3}} /></div>)

        if(this.state.step == '2')
            return (<div className="container h-100">{this.renderStep2()} <Alert stack={{limit: 3}} /> </div>)

        if(this.state.step == '3')
            return (<div className="container h-100">{this.renderStep3()} <Alert stack={{limit: 3}} /> </div>)
        
        if(this.state.step == '4')
            return (<div className="container h-100">{this.renderStep4()} <Alert stack={{limit: 3}} /> </div>)
    }
}

export default Signup;