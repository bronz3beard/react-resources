import React, { PureComponent, Fragment } from "react";
import firebase from "./Firebase/firebase";

//Components
import Nav from "./Components/nav";
import TopicSlider from "./Components/topic-slider";
import Preloader from "./Components/preloader";
import ScrollButton from "./Components/scroll-to-top";
import DataForm from "./Components/form-data";
import DataFilter from "./Components/form-filter";
import ItemCard from "./Components/item-card";

const API_KEY = process.env.REACT_APP_SAFE_BROWSE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_SAFE_BROWSE_CLIENT_ID;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: false,
      showForm: false,
      isEditForm: false,
      isOpen: false,
      linkId: "",
      editUrl: "",
      isMalicious: false,
      checkResponse: "",
      formControls: {
        topic: {
          value: "",
          placeHolder: "Topic"
        },
        link: {
          value: "", //https://testsafebrowsing.appspot.com/s/phishing.html
          placeHolder: "Paste link"
        },
        description: {
          value: "",
          placeHolder: "Short description"
        },
        query: {
          value: "",
          placeHolder: "Topic filter"
        }
      }
    };
  }
  componentDidMount() {
    /*for (let item in allItems) {
      const postId = itemsRef.push();
    }*/
    this.getFirebase();
  }
  getFirebase() {
    this.setState({
      isLoading: true
    });
    const itemsRef = firebase.database().ref("allTopics");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();

      let newState = [];
      for (let item in items) {
        let field = items[item];
        let fbId = item;
        newState.push({
          field,
          fbId
        });
      }
      if (items && newState) {
        this.setState({
          data: newState
        });
      } else {
        this.setState({
          data: null,
          loading: false,
          error: true
        });
      }
    });
    this.setState({
      isLoading: false
    });
  }
  handleSubmit = () => {
    const { data, formControls } = this.state;

    const itemsRef = firebase.database().ref("allTopics");
    const urlValid = regexTest.test(formControls.link.value);
    const item = {
      topic: formControls.topic.value,
      link: formControls.link.value,
      description: formControls.description.value,
      linkId: data.length + 1
    };
    if (urlValid) {
      itemsRef.push(item);
      alert("Resource submitted!");
      window.location.reload();
    } else {
      alert("Please enter a valid url");
    }
  };
  handleUpdateFirebase = () => {
    const { formControls, linkId } = this.state;
    const itemsRef = firebase.database().ref("allTopics").child(linkId);
    itemsRef.update({
        topic: formControls.topic.value,
        link: formControls.link.value,
        description: formControls.description.value,
        linkId: linkId
      }).then(() => {
        alert("Data saved successfully.");
        window.location.reload();
      }).catch(error => {
        alert("Data could not be saved." + error);
      });
  };
  isEmpty = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true; //isMalicious
      }
    }
    return false;
  };
  handleUrlCheck = (url, isEditForm, event) => {
    event.preventDefault();
    const body = {
      client: {
        clientId: CLIENT_ID,
        clientVersion: "0.1.0"
      },
      threatInfo: {
        threatTypes: [
          "MALWARE",
          "SOCIAL_ENGINEERING",
          "UNWANTED_SOFTWARE",
          "POTENTIALLY_HARMFUL_APPLICATION",
          "THREAT_TYPE_UNSPECIFIED"
        ],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url: url }]
      }
    }; //threatEntries: urls.map(u => Object.assign({}, { url: u }))

    const check = new XMLHttpRequest();
    check.open(
      "POST",
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
      true
    );
    check.setRequestHeader("Content-Type", "application/json");
    check.onload = () => {
      let testObject = JSON.parse(check.response);
      let objectCheck = this.isEmpty(testObject);
      if (check.readyState === check.DONE) {
        if (check.status === 200) {
          if (objectCheck) {
            this.setState({
              isMalicious: true,
              checkResponse: check.response,
            });
            alert("Link is Malicious");
          } else {
            this.setState({
              isMalicious: false,
            });
            if (isEditForm) {
              this.handleUpdateFirebase(event);
            } else {
              this.handleSubmit(event);
            }
          }
        } else if (check.status === 0) {
          alert("No Response from server.");
        }
      }
    };
    check.onerror = error => {
      alert("Error Status: " + error.target.status);
    };
    check.send(JSON.stringify(body));
  };
  changeHandler = event => {
    const { formControls } = this.state;
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...formControls,
        [name]: {
          ...formControls[name],
          value
        }
      }
    });
  };
  handleShowForm = () => {
    const { formControls, showForm, isOpen } = this.state;
    this.setState({
      showForm: !showForm,
      isOpen: !isOpen,
      isEditForm: false,
      checkResponse: "",
      formControls: {
        ...formControls,
        topic: {
          ...formControls.topic,
          value: ""
        },
        link: {
          ...formControls.link,
          value: ""
        },
        description: {
          ...formControls.description,
          value: ""
        }
      }
    });
  };
  handleShowEditForm = (topic, link, description, linkId) => {
    const { formControls, showForm, isOpen } = this.state;
    this.setState({
      showForm: !showForm,
      isOpen: !isOpen,
      isEditForm: true,
      linkId,
      editUrl: link,
      checkResponse: "",
      formControls: {
        ...formControls,
        topic: {
          ...formControls.topic,
          value: topic
        },
        link: {
          ...formControls.link,
          value: link
        },
        description: {
          ...formControls.description,
          value: description
        }
      }
    });
  };
  handleModal = () => {
    document.body.style.overflow = "auto";
    this.setState({
      overflow: false,
      isOpen: false,
      showForm: false,
      isEditForm: false,
      isMalicious: false,
    });
  };
  //on page table filter handler
  tableSearchFilter = event => {
    let query = event.target.value.substr(0, 100);
    this.setState({
      query: query
    });
  };
  render() {
    const { isLoading, error, isMalicious, checkResponse, isEditForm, data, showForm, formControls } = this.state;

    if (isLoading) {
      return <Preloader />;
    }
    if (error) {
      return (
        <div className="error">
          <span>data has been fetched but it is empty.</span>
        </div>
      );
    }
    /*const groupedItems = data.reduce((itemCollection, topic) => {
      if (!itemCollection[topic]) {
        itemCollection[topic] = [];
      }
      itemCollection[topic].push(topic.field.link);
      return itemCollection;
    }, {});*/

    const lowercasedFilter = formControls.query.value.toLowerCase();
    const filteredData =
      data &&
      data.filter(item => {
        if (item.field.topic) {
          return (
            item.field.topic.toLowerCase().indexOf(lowercasedFilter) !== -1 ||
            !lowercasedFilter
          );
        }
      });

    return (
      <Fragment>
        <Nav />
        <TopicSlider data={filteredData} />
        <DataFilter
          query={formControls.query.value}
          placeHolder={formControls.query.placeHolder}
          handleShowForm={this.handleShowForm}
          changeHandler={this.changeHandler}
        />
        {showForm ? (
          <DataForm
            isMalicious={isMalicious}
            checkResponse={checkResponse}
            isEditForm={isEditForm}
            topic={formControls.topic.value}
            link={formControls.link.value}
            description={formControls.description.value}
            handleShowForm={this.handleShowForm}
            changeHandler={this.changeHandler}
            handleUrlCheck={this.handleUrlCheck}
            handleModal={this.handleModal}
          />
        ) : null}
        <ItemCard
          filteredData={filteredData}
          handleShowEditForm={this.handleShowEditForm}
        />
        <ScrollButton />
        <footer />
      </Fragment>
    );
  }
}

export default App;

const regexTest = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;