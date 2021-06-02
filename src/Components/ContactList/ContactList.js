import React from "react";
import { connect } from "react-redux";

// Service
import { getAllContacts, updateContacts } from "../../Services/api-service";

// Actions
import { getContacts, onDeleteContact } from "../../Actions/ContactListActions";

// ContactItem
import ContactItem from "./ContactItem/ContactItem";

class ContactList extends React.Component {
  componentDidMount() {
    const { getContacts } = this.props;
    getAllContacts().then((data) => {
      if (data === null) {
        getContacts([]);
      } else {
        getContacts(data);
      }
    });
  }
  onDelete = (Id) => {
    const { List, onDeleteContact } = this.props;
    const index = List.findIndex((elem) => elem.Id === Id);
    const partOne = List.slice(0, index);
    const partTwo = List.slice(index + 1);
    const tmpList = [...partOne, ...partTwo];
    onDeleteContact(tmpList);
    updateContacts(tmpList);
  };
  render() {
    const { List } = this.props;
    return (
      <div className='container bootstrap snippets bootdeys bootdey'>
        <div className='row decor-default'>
          <div className='col-sm-12'>
            <div className='contacts-list'>
              <h5 className='title'>Contact List</h5>
              <div className='unit head'>
                <div className='field name'>
                  <div className='check'>
                    <input id='cb1' name='cb1' type='checkbox' />
                    <label htmlFor='cb1'></label>
                    <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'></svg>
                  </div>
                  Name
                </div>
                <div className='field phone'>Phone</div>
                <div className='field email icons'>
                  Email
                  <i className='fas fa-user-edit'></i>
                </div>
              </div>
              {List.length !== 0 ? (
                List.map((item) => {
                  return <ContactItem key={item.Id} {...item} onDelete={() => this.onDelete(item.Id)} />;
                })
              ) : (
                <h2>Contacts not found</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer;
  return { List };
};
const mapDispatchToProps = {
  getContacts,
  onDeleteContact,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
