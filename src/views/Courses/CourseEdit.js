import React from "react";
import API from '../../library/API'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CourseForm from './CourseForm.js'
import ScheduleEdit from "../Schedules/ScheduleEdit.js"

import { withStyles } from "@material-ui/core/styles";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class CourseEdit extends React.Component {

  constructor(props) {
    super(props)

    this.onSuccess = this.onSuccess.bind(this)
    this.onFailure = this.onFailure.bind(this)

    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = this.props.location.state || { course: null }

    API.configure(props.token)
  
    if(!this.state.course){
      const id = this.props.location.pathname.split("/")[2]
      API.get('courses', id,
        function(response){
          this.setState({ course: response })
        }.bind(this),
        function(error){
          this.props.notifyError(error)
        }.bind(this)
      )
    }
  }

  onSuccess(response){
    const { id } = response
    this.props.history.push('/courses/' + id, this.state);
    this.props.notifySuccess("Course updated successfully")
  }
  
  onFailure(error){
    console.log(error);
    this.props.notifyError(error)
  }
  
  onClick(){
    API.update('courses', this.state.course.id, this.state, this.onSuccess, this.onFailure)
  }
  
  onChange(event){
    const { name, value } = event.target
    this.setState({ course: {...this.state.course, [name]: value } });
  }
  
  show(course){
    this.props.history.push('/courses/' + course.id, { course });
  }

  render() {
    const { classes, levels, teachers } = this.props
    //[++]
    const { course } = this.state
    if(!course) return null
 
    console.log(course);
 
    return(
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Course</h4>
            </CardHeader>

            <CourseForm
              course={course}
              levels={levels}
              teachers={teachers}
              onChange={this.onChange}
            />

            <CardFooter>
              <Button color="primary" onClick={this.onClick}>Update</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <ScheduleEdit schedules={course.schedules} onChange={this.onChange} />
        
      </GridContainer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CourseEdit);


