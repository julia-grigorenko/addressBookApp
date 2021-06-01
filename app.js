// ============== Model ========================= 
const contactsData = [{
    'fname': 'Ann',
    'lname': 'Arasan',
    'phone': '309-6101',
    'email': 'a.arasan@gmail.com'
}, {
    'fname': 'Ardrew',
    'lname': 'Mugilan',
    'phone': '701-7102',
    'email': 'a.mugilan@gmail.com'
}, {
    'fname': 'Bob',
    'lname': 'Johnson',
    'phone': '909-3948',
    'email': 'bob.johnson@egmail.com'
}, {
    'fname': 'Romeo',
    'lname': 'Tamilly',
    'phone': '909-0101',
    'email': 'r.tamil@gmail.com'
}, {
    'fname': 'Sunny',
    'lname': 'Kannan',
    'phone': '909-0101',
    'email': 's.kannan@gmail.com'
}]

// ============== View ========================= 
class AddressBookView {
    init() {
        this.renderContactListModule();
        this.renderContactDetailsModule(0);
        this.addContactModule();   
    }
    renderContactListModule() {
        //get all contacts and assign to contacts 
        const contacts = addressBookApp.getContacts();
    
        // cache #contact-list DOM 
        const contactListUI = document.getElementById('contact-list');
    
        // clear HTML from the DOM 
        contactListUI.innerHTML = '';
    
        for (let i = 0, len = contacts.length; i < len; i++) {
            let li = document.createElement('li');
            li.setAttribute('class', 'contact-list-item');
            li.setAttribute('data-index', i);
            li.innerHTML = `${contacts[i]['fname']},${contacts[i]['lname']}`;
            contactListUI.append(li);
            li.addEventListener("click", this.renderContactDetailsModule);
        }
    }
    

    renderContactDetailsModule(e) {
        let selectedIndex = null;

        function hightlightCurrentListItem(selectedIndex) {
            const ContactListItems = document.getElementsByClassName('contact-list-item');
            for (let i = 0, len = ContactListItems.length; i < len; i++) {
                ContactListItems[i].classList.remove('active');
            }
            ContactListItems[selectedIndex].classList.add("active")
        }


        if (typeof e === 'object') {
            e.stopPropagation();
            selectedIndex = this.getAttribute('data-index')
        } else {
            selectedIndex = e;
        }
        const selectedItem = addressBookApp.getContact(selectedIndex);
        const ContactItemUI = document.getElementById('contact-item-details');
        ContactItemUI.innerHTML = `${selectedItem['fname']} <br> ${selectedItem['lname']} <br> ${selectedItem['phone']} <br> ${selectedItem['email']}`;
        hightlightCurrentListItem(selectedIndex);
    }
    
    addContactModule() {
        const addContact = document.getElementById('add-contact-btn');
        addContact.addEventListener("click", this.addContactBtnClicked.bind(this));
    }
    addContactBtnClicked() {

        // get the add contact form inputs 
        const addContactInputs = document.getElementsByClassName('add-contact-input');
    
        // this object will hold the new contact information
        let newContact = {};
    
        // loop through View to get the data for the model 
        for (let i = 0, len = $addContactInputs.length; i < len; i++) {
    
            let key = $addContactInputs[i].getAttribute('data-key');
            let value = $addContactInputs[i].value;
            newContact[key] = value;
        }
    
        // passing new object to the addContact method 
        addressBookApp.addContact(newContact);
    
        // render the contact list with the new data set
        this.renderContactListModule();
    
    }

}

const addressBookView = new AddressBookView();

//================ Controller (API) ================== 
class AddressBookCtrl {
    constructor(addressBookView) {
        this.addressBookView = addressBookView;
    }
    init() {
        this.addressBookView.init();
    }
    getContacts() {
        return contactsData;
    }
    getContact(index) {
        return contactsData[index];
    }
    addContact(contact) {
        contactsData.push(contact);
    }
    
}

const addressBookApp = new AddressBookCtrl(addressBookView);

addressBookApp.init();





