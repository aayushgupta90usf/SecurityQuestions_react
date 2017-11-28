/* This application is a simple react application based on asking security questions where a person can answer some basic security questions.
** And after submitting its response have been validated, saved and shown.
**importing react and react dom from the library installed.
** Also, using webpack with babel as loader for converting JSX element to browser readable format
*/
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

// Creating component by extending the React Componet
class SecuityQuestion extends React.Component {

  // Constructor for initializing the props and state.
  // We are taking a list of secret questions where we are storing the questions, their answers and error if there is any on the fly.
  // Also, used another state visibility for rendering another component (Submit) which is basically called after submit and after all the validation are passed.
  constructor(props,context) {
      super(props,context);
      this.state = {
        visibility: false,
        secQue : [{que:"What is your first pet name?",ans:'',err:''},{que:"What is your mother's maiden name?", ans:'',err:''},{que: "In which city you were born?",ans:'',err:''}],
      }
    }

// this is a method which is called when there is a change on the text box for answer.
// It basically set the ansin the state as per the response from the user.
// Also, the error handling is beeing done in this method since user has to give answer for all the questions.
    changeEvent(index,e) {
      var temp = this.state.secQue;
      temp[index].ans = e.target.value;
      if(e.target.value) {
          temp[index].err = '';
        }
      this.setState({ secQue: temp });

    }

// There ia reset button whcih clears the ans state for all the question.
    handleReset(e) {
      e.preventDefault();
      var temp = this.state.secQue;
      temp.map((message,index) => {
          message.ans = '';
      })

      return (this.setState({ secque : temp }));
    }

// This method is called after click on a submit button.
//This button checks if there is any blank ans text box, then it will not submit and give an error below the text box.
    handleSubmit(e) {
      e.preventDefault();

      var bool = true;
      this.state.secQue.map((message,index) => {
        if(!message.ans.length) {
          message.err = "It can not be blank";
          bool = false;
        }
      })
      return (this.setState({ visibility: bool }));

    }

// Actual render method where first we are creating a variable by iterating the sec question list.
// Handling all the event like onChange(for text box) and onSubmit(for buttons).
// Displaying the question from the list and creating a text box with a span element for the error. The error is updated on the fly.
// On the basis of visibility state i.e after all the validation passed(visibility set to true), the submittion is done and Submit component is called.
// Else it will display the questions and text box for answers. with submit and reset button in the end.
// Used bootstrap styling to display the table bordered and style
      render() {
        let msgs = this.state.secQue.map((message,i) => {
          return (
            <tr key = {i}>
            <tr><td> {message.que}</td></tr>
              <tr><td>
              <input type="text" onChange = {this.changeEvent.bind(this,i)} style={{width:"340px"}} value = {message.ans}></input>
              </td></tr>
              <tr><td><span className = "text-danger" ref="warning">{message.err}</span></td></tr>
            </tr>
          )
        });

        return (
          this.state.visibility?<Submit queAns = {this.state.secQue}/>:

          <div className ="col-sm-4" >
          <form>
              <table className ="col-sm-8 table table-bordered table-striped table-condensed table-hover">
                  <caption className = "text-center"><h2><b>Security Question</b></h2> </caption>
                  <tbody>
                    {msgs}
                  </tbody>
                  <br/><div className ="col-sm-6"></div>
                  <button type="button" className="btn btn-md btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                  <button type="button" className="btn btn-md btn-primary" onClick={this.handleReset.bind(this)}>Reset</button>
              </table>

          </form>

          </div>
        )
      }

}

// Another component for displaying the successfull submission page with questions and their respective answer given by the user.
class Submit extends React.Component {
  constructor(props,context) {
      super(props,context);
    }

// Actual rendering on the basis of props send by the Security question component.
// Running the loop using map function on the sec ques list with their answer.
// Table is used to render the question adn the answers with bootstrap styling.
  render() {
    return(
      <div className ="col-sm-5" >
        <div><h3>Your response has been submitted successfully.</h3></div><br />
        <table className ="table table-bordered table-striped table-condensed table-hover">
            <caption className = "text-center"><h4> Please see your responses as below: </h4> </caption>
            <tbody>
                  {this.props.queAns.map((message,index) => (
                    <tr key={index}><td>
                      <div>Que:{message.que}</div>
                      <div>Ans. {message.ans}</div>
              </td></tr>
        )
      )}
      </tbody>
      </table>
      </div>
    );
  }
}

// Main method for embedding the virtual dom to real dom.
// Real dom is at HTML file(index.html)
ReactDOM.render(<SecuityQuestion />, document.getElementById('app'));
