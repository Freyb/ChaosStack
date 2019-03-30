import React, { Component, Fragment, useState } from "react";
import { graphql, compose, withApollo } from "react-apollo";

// queries
import GetAllTestQuestions from "../../graphql/queries/GetAllTestQuestions";
import GetAllUsers from "../../graphql/queries/GetAllUsers";

// mutations
import AddNewUser from "../../graphql/mutations/AddNewUser";

const initialState = {
  user: {
    name: "",
    score: ""
  }
};

class AllRecipesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleInput = event => {
    this.setState({ user: { name: event.target.value } });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      const { name } = this.state.user;
      const { users } = this.props.data;
      let found = false;
      users.forEach(element => {
        if (element.username === name) {
          found = true;
        }
      });
      if (found) {
        alert("Foglalt");
      } else {
        alert("Siker");
        this.props
          .addNewUserMutation({
            variables: {
              name
            },
            refetchQueries: [
              {
                query: GetAllUsers
              }
            ]
          })
          .catch(e => {
            console.log("hiba");
          });
      }
      event.preventDefault();
    }
  };

  render() {
    const { tests } = this.props.data;
    const questionList = [];

    if (tests) {
      tests.forEach(t => {
        return t.questions.forEach(q => {
          questionList.push(q);
        });
      });
    }
    //console.log(tests);
    return (
      <Fragment>
        <h1>Enter your username</h1>
        <form>
          <input
            value={this.state.user.name}
            onChange={e => this.handleInput(e)}
            onKeyPress={e => this.handleKeyPress(e)}
          />
        </form>
        <ul>
          {questionList.map(e => (
            <li key={e.id}>{e.text}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default compose(
  graphql(AddNewUser, { name: "addNewUserMutation" }),
  graphql(GetAllTestQuestions)
  //graphql(GetAllUsers)
)(withApollo(AllRecipesContainer));
