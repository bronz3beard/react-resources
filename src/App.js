import React, { PureComponent } from "react";
import Firebase from "./Firebase/firebase";

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
      linkId: "",
      editUrl: "",
      error: false,
      isOpen: false,
      isLoading: true,
      showForm: false,
      itemAdded: false,
      isEditForm: false,
      itemUpdated: false,
      isDuplicate: false,
      checkResponse: "",
      isMalicious: false,

      formControls: {
        topic: {
          value: "",
          placeHolder: "Topic"
        },
        link: {
          value: "",
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
    /* below will be useful for bulk upload eventually
    for (let item in allItems) {
      const postId = itemsRef.push();
    }*/
    this.getFirebase();
  }
  //handles fetching all db resources
  getFirebase() {
    const itemsRef = Firebase.database().ref("allTopics");
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
          data: newState,
          isLoading: false
        });
      } else {
        this.setState({
          data: null,
          loading: false,
          error: true
        });
      }
    });
  }
  //handles submitting new resources
  handleSubmit = isDuplicate => {
    const { data, formControls } = this.state;
    const itemsRef = Firebase.database().ref("allTopics");
    const urlValid = regexTest.test(formControls.link.value);
    const item = {
      topic: formControls.topic.value,
      link: formControls.link.value,
      description: formControls.description.value,
      linkId: data.length + 1
    };
    if (urlValid && !isDuplicate) {
      itemsRef.push(item);
      //alert("Resource submitted!");
      this.setState({
        itemAdded: true
      });
    } else if (!urlValid || isDuplicate) {
      this.setState({
        itemAdded: false,
        isDuplicate
      });
    }
  };
  // handles updateing a resource
  handleUpdateFirebase = (isDuplicate, isEditForm) => {
    const { formControls, linkId } = this.state;
    const itemsRef = Firebase.database().ref("allTopics").child(linkId);
    const urlValid = regexTest.test(formControls.link.value);
    if (urlValid && !isDuplicate) {
      itemsRef
        .update({
          topic: formControls.topic.value,
          link: formControls.link.value,
          description: formControls.description.value,
          linkId: linkId
        })
        .then(() => {
          this.setState({
            itemUpdated: true
          });
        })
        .catch(error => {
          this.setState({
            itemUpdated: false
          });
          alert("Data could not be saved." + error);
        });
    } else if (!urlValid) {
      this.setState({
        itemUpdated: false,
        isDuplicate
      });
    } else if (isEditForm && isDuplicate) {
      itemsRef
        .update({
          topic: formControls.topic.value,
          description: formControls.description.value,
          linkId: linkId
        })
        .then(() => {
          this.setState({
            itemUpdated: true,
            isDuplicate
          });
        })
        .catch(error => {
          alert("Data could not be saved." + error);
        });
    }
  };
  // this will check if the malicious url check object is empty or not
  isEmpty = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true; //isMalicious
      }
    }
    return false;
  };
  // this checks for duplicates in the db
  isDuplicate = url => {
    const { data, formControls } = this.state;
    const links = Array.from(
      new Set(data.map(duplicate => duplicate.field.link))
    );
    let isDuplicate = links.indexOf(url) > -1;
    const updateDescription = formControls.description.value;
    if (!updateDescription) {
      isDuplicate = false;
    }
    if (isDuplicate) {
      return true; //isDuplicate
    } else {
      return false;
    }
  };
  handleUrlCheck = (url, isEditForm, event) => {
    event.preventDefault();

    // test if submitted url is in the db already
    const isDuplicate = this.isDuplicate(url);

    // this is the body send to Google Safe Browse to test if link is malicious
    const body = {
      client: {
        clientId: CLIENT_ID,
        clientVersion: "0.2.0"
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
    }; // this can be used for bulk update chack later -> threatEntries: urls.map(u => Object.assign({}, { url: u }))

    //create request to POST to google
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
              checkResponse: check.response
            });
            alert("Link is Malicious");
          } else {
            this.setState({
              isMalicious: false
            });
            if (isEditForm) {
              this.handleUpdateFirebase(isDuplicate, isEditForm);
            } else {
              this.handleSubmit(isDuplicate);
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
  // handle form inputs
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
  //handle show new resource form and modal
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
  //handle show edit form and modal
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
  //handle close modal
  handleModal = () => {
    document.body.style.overflow = "auto";
    this.setState({
      isOpen: false,
      overflow: false,
      showForm: false,
      itemAdded: false,
      isEditForm: false,
      itemUpdated: false,
      isDuplicate: false,
      isMalicious: false
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
    const {
      data,
      error,
      showForm,
      isLoading,
      itemAdded,
      isEditForm,
      itemUpdated,
      isDuplicate,
      isMalicious,
      checkResponse,
      formControls
    } = this.state;

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
        return null;
      });

    return (
      <div className="body-overlay">
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
            itemAdded={itemAdded}
            isEditForm={isEditForm}
            isMalicious={isMalicious}
            itemUpdated={itemUpdated}
            isDuplicate={isDuplicate}
            checkResponse={checkResponse}
            link={formControls.link.value}
            topic={formControls.topic.value}
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
      </div>
    );
  }
}

export default App;

const regexTest = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
