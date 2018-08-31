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
{
    state = {
        id:"cjlarb4hbfb0d0b46fggw6vmy",
        step: 1,
        qualification: '',
        gender: '',
        classes: [],
        profession: '',
        name: '',
        email: '',
        number: '',
        age: '',
        exp: '',
        price: ''
    }
    renderStep1 = () =>
    {
        return (<div className="row justify-content-center" style={{display: 'flex',
            '-webkit-box-align': 'center',
            'align-items': 'center',
            '-webkit-box-pack': 'center',
            'justify-content': 'center',
            'padding-top': '20px',
            'width': '100%',
            'height': '100%'}}>

            <div className="col-4">

            <div style={{marginTop: '48px', marginBottom: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className="logo">
                <img src="logo.png" width="70px" height="70px"/>    
            </div>
            <Mutation mutation={REGISTER}>
            {(register, { data }) => (
            <form style={{background: '#fff',padding: '10%', borderRadius: '10px'}} className="shadow-lg align-self-center" onSubmit={(e) => {
                e.preventDefault();
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
                <input className="form-control" type="text" placeholder="Enter Name" value={this.state.name} name="name" required onChange={(e) => {
                    this.setState({name: e.target.value})
                }}/>
                </div>
                <div className="form-group">
                <label for="email"><b>Email</b></label>
                <input className="form-control" type="text" placeholder="Enter Email" value={this.state.email} name="email" required onChange={(e) => {
                    this.setState({email: e.target.value})
                }}/>
                </div>

                <div className="form-group">
                <label for="mobile"><b>Mobile</b></label>
                <input className="form-control" type="number" placeholder="Enter Mobile No." value={this.state.number} name="mobile" required onChange={(e) => {
                    this.setState({number: e.target.value})
                }}/>
                </div>  

                    <button className="btn btn-primary btn-block" type="submit">Send OTP</button>

            </form>
            )}
            </Mutation>
            </div>
            </div>
    </div>);
    }

    renderStep2 = () => {
        return (<div>
            <Mutation mutation={CONFIRM_OTP}>
            {(confirmOTP, { data }) => (<div id="id01" class="modal parent">
            
            <form class="modal-content" onSubmit={(e) => {
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
                <div class="container">
                <h1>Step 2</h1>
                <p>Please Confirm OTP.</p>
                <hr />
                <label for="email"><b>OTP</b></label>
                <input type="number" placeholder="Enter OTP." value={this.state.otp} name="otp" required onChange={(e) => {
                    this.setState({otp: e.target.value})
                }}/>

                <div class="clearfix">
                    <button type="submit" class="signupbtn">Confirm OTP</button>
                </div>
                </div>
            </form>
            </div>)}
            </Mutation>
            
    </div>);
    }

    renderStep3 = () => {
        return (<div>

            <Mutation mutation={UPDATE_DATA}>
            {(updateUserData, { data }) => (
            <div id="id01" class="modal">
            
            <form class="modal-content" onSubmit={(e) => {
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
                    Alert.error('Select your Qualification!', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }

                if(this.state.exp == '')
                {
                    error = true;
                    Alert.error('Enter Your Experience!', {
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
                    Alert.error('Enter price for 12 classes!', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                    });
                }




                var d = {
                    id: this.state.id,
                    age: this.state.age,
                    gender: this.state.gender.value,
                    qualification: this.state.qualification.value,
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
            }} style={{marginTop:"1%"}}>
                <div class="container">
                <h1>Step 3</h1>
                <p>Tell us more about you...</p>
                <hr />
                <label for="name"><b>Name</b></label>
                <input type="text" placeholder="Enter Name" value={this.state.name} name="name" disabled />
                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" value={this.state.email} name="email" disabled />
                <label for="mobile"><b>Mobile</b></label>
                <input type="number" placeholder="Enter Mobile No." value={this.state.number} name="mobile" disabled />
                <hr />
                <label for="age"><b>Age</b></label>
                <input type="number" placeholder="Enter Age." value={this.state.age} name="age" autoFocus onChange={(e) => {
                    this.setState({age: e.target.value})
                }}/>
                <label for="gender"><b>Gender</b></label>
                <Select
                    value={this.state.gender}
                    onChange={(val) => {this.setState({gender: val})}}
                    options={[{value: "M", label: "Male" },
                    {value: "F", label: "Female" }]}
                />
                <hr />
                <label for="qual"><b>Qualification</b></label>
                <Query query={QUALIFICATION}>
                    {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    var qualifications = data.getQualifications.map(e => ({label: e.name, value: e.id}))

                    return (
                        <Select
                            value={this.state.qualification}
                            onChange={(val) => {this.setState({qualification: val})}}
                            options={qualifications}
                        />
                    );
                    }}
                </Query>
                <hr />

                <label for="exp"><b>Tutoring Experience</b></label>
                <input type="number" placeholder="Enter Experience." name="exp" value={this.state.exp} onChange={(e) => {
                    this.setState({exp: e.target.value})
                }}/>

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

                <hr />

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
                
                <hr />

                <label for="price"><b>Price for 12 Tuition Classes</b></label>
                <input type="number" placeholder="Enter Price." value={this.state.price} name="price" onChange={(e) => {
                    this.setState({price: e.target.value})
                }}/>

                <div class="clearfix">
                    <button type="submit" class="signupbtn">Register</button>
                </div>
                </div>
            </form>
            </div>)}
            </Mutation>
    </div>);
    }

    renderStep4 = () => {
        return (<div>
        <div class="right">
            </div>
        <div id="id01" class="modal" >
        
        <div className="modal-content" style={{width: "30%", height: "30%"}}>
        <h1>Thank you!</h1>
        <h4>We will get back to you shortly</h4>
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