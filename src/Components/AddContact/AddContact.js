import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

// Redux
import { connect } from "react-redux";

// Action
import { onAddContact } from "../../Actions/ContactListActions";

// Service
import { updateContacts } from "../../Services/api-service";

import { Redirect } from "react-router-dom";
class AddContact extends React.Component {
  state = {
    Avatar: "",
    Gender: "men",
    Name: "",
    Phone: "",
    Email: "",
    Status: "Friend",
    isRedirect: false,
  };

  getName = (e) => {
    const name = e.target.value;
    this.setState({
      Name: name,
    });
  };

  getEmail = (e) => {
    const email = e.target.value;
    this.setState({
      Email: email,
    });
  };

  getPhone = (e) => {
    const phone = e.target.value;
    this.setState({
      Phone: phone,
    });
  };

  getStatus = (e) => {
    const status = e.target.value;
    this.setState({
      Status: status,
    });
  };

  getGender = (e) => {
    const gender = e.target.value;
    this.setState({
      Gender: gender,
    });
  };

  getAvatar = (e) => {
    const avatar = e.target.value;
    this.setState({
      Avatar: avatar,
    });
  };

  sendForm = (e) => {
    e.preventDefault();
    const { Avatar, Gender, Name, Phone, Email, Status } = this.state;
    const { onAddContact, List } = this.props;

    const newContact = {
      Id: uuidv4(),
      Avatar: parseInt(Avatar),
      Gender: Gender,
      Name: Name,
      Phone: Phone,
      Email: Email,
      Status: Status,
    };
    let tmpList = List.slice();
    tmpList.unshift(newContact);
    console.log("tmpList ", tmpList);
    this.setState({
      isRedirect: true,
    });
    updateContacts(tmpList);
    onAddContact(tmpList);
  };

  render() {
    const { Avatar, Gender, Name, Phone, Email, isRedirect } = this.state;
    const image = `https://randomuser.me/portraits/${Gender}/${Avatar}.jpg`;
    console.log("ADD-state=>", this.state);
    if (isRedirect) {
      return <Redirect to='/' />;
    }
    return (
      <Fragment>
        <div className='container'>
          <h2 className='text-center'>Add new contact</h2>
          <form onSubmit={this.sendForm}>
            <div className='row'>
              <div className='col-6'>
                <div className='form-group'>
                  <fieldset disabled=''>
                    <label className='form-label'>Name</label>
                    <input className='form-control' required type='text' onChange={this.getName} placeholder={Name} />
                  </fieldset>
                </div>

                <div className='form-group'>
                  <fieldset>
                    <label className='form-label mt-4'>Email</label>
                    <input
                      className='form-control'
                      required
                      type='email'
                      onChange={this.getEmail}
                      placeholder={Email}
                    />
                  </fieldset>
                </div>

                <div className='form-group '>
                  <label className='form-label mt-4'>Phone</label>
                  <input type='tel' placeholder={Phone} required onChange={this.getPhone} className='form-control' />
                </div>
              </div>
              <div className='col-6 '>
                <div className=' border border-white w-100 h-100 d-flex justify-content-center align-items-center '>
                  {Avatar && Gender ? <img src={image} alt='imageAvatar' className='w-50' /> : null}
                </div>
              </div>
            </div>

            <div className='d-flex '>
              <div className='form-group'>
                <label htmlFor='exampleSelect1' className='form-label mt-4'>
                  Status
                </label>
                <select className='form-select ml-3' id='exampleSelect1' onChange={this.getStatus}>
                  <option>Friend</option>
                  <option>Work</option>
                  <option>Private</option>
                  <option>Family</option>
                </select>
              </div>
              <div className='form-group ml-4'>
                <label htmlFor='exampleSelect1' className='form-label mt-4'>
                  Gender
                </label>
                <select className='form-select ml-3' id='exampleSelect1' onChange={this.getGender}>
                  <option>men</option>
                  <option>women</option>
                </select>
              </div>
            </div>
            <div className='form-group'>
              <label className='col-form-label mt-2'>Avatar</label>
              <input
                type='number'
                min='0'
                max='99'
                required
                onChange={this.getAvatar}
                className='form-control'
                placeholder={Avatar}
              />
            </div>

            <button type='submit' className='btn btn-success'>
              Save
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer;
  console.log("mapStateToProps ====>>", ContactListReducer);
  return { List };
};
const mapDispatchToProps = {
  onAddContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
