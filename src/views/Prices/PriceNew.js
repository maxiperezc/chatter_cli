import React from 'react'
import API from '../../library/API'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import PriceForm from './PriceForm.js'

import { defaultPrice } from 'variables/general'

import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


class PriceNew extends React.Component {

  constructor(props) {
    super(props)

    this.state = { price: defaultPrice }

    this.onSuccess = this.onSuccess.bind(this)
    this.onFailure = this.onFailure.bind(this)

    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)

    API.configure(props.token)
  }

  onSuccess(response){
    const { id } = response
    this.props.history.push('/prices/' + id, { price: response} );
    this.props.notifySuccess("Price created succesfully")
  }

  onFailure(error){
    this.props.notifyError(error)
  }

  onClick(){
    API.create('prices', this.state, this.onSuccess, this.onFailure)
  }

  onChange(event){
    const { name, value } = event.target
    this.setState({ price: {...this.state.price, [name]: value } });
  }

  render() {
    const { classes, levels } = this.props
    const { price } = this.state
    if(!price) return null

    return(
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>New Price</h4>
            </CardHeader>

            <PriceForm price={price} onChange={this.onChange} levels={levels} />

            <CardFooter>
              <Button color="primary" onClick={this.onClick} >
                Create
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PriceNew);
