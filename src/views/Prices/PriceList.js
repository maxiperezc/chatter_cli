import React from "react";
import API from '../../library/API'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Button from "components/CustomButtons/Button.js";

import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

class PriceList extends React.Component {

  constructor(props) {
    super(props)
    this.state = { prices: [], all: [] }

    API.configure(props.token)
    API.all(
      'prices',
      function(data){
        this.setState({ prices: data, all: data })
        this.props.notifySuccess("Prices loaded !!")
      }.bind(this),
      function(error){
        console.log(error)
        this.props.notifyError("Prices not loaded :( => " + error)
      }.bind(this)
    )
  }

  search(event){
    const lookup = event.target.value.trim().toLowerCase();
    var list = this.state.all
    if(lookup !== ''){
      list = list.filter(function(item){
        return (
          item.level.name.toLowerCase().includes(lookup) ||
					item.kind.toLowerCase().includes(lookup)
        )
      }) || []
    }

    this.setState({ ...this.state, prices: list })
  }

  new(){
    this.props.history.push('/prices/new');
  }

  edit(price){
    this.props.history.push('/prices/' + price.id + '/edit', { price });
  }

  render() {
    const { classes } = this.props
    const { prices } = this.state

    const groupPrices = prices.filter(function(p){ return p.kind === "Group" })
    const individualPrices = prices.filter(function(p){ return p.kind === "Individual" })

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <div style={{ float: "left" }}>
                <h4 className={classes.cardTitleWhite}>Group Prices</h4>
              </div>

              <div style={{ float: "right" }}>
                <CustomInput
                  labelText="Search"
                  inputProps={{ onChange: this.search.bind(this) }}
                  formControlProps={{ style: { margin: 0 }, fullWidth: true }}
                />
              </div>
            </CardHeader>
            <CardBody>
              <Button color="warning" aria-label="add" justIcon round onClick={ this.new.bind(this)} >
                <AddIcon />
              </Button>
              <Table
                tableHeaderColor="primary"
                tableHead={['Level', 'Months', 'Amount', 'MercadoPago', 'Actions']}
                tableData={
                  groupPrices.map(price => {
                    return [
                      price.level.name,
											price.period,
											price.amount,
                      <a target="_blank" href={price.mercadopago_link}>{price.mercadopago_link}</a>,
                      <div>
                        <Button color="primary" aria-label="edit" justIcon round onClick={ this.edit.bind(this, price)} >
                          <EditIcon />
                        </Button>
                      </div>
                    ]}
                  )
                }
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <div style={{ float: "left" }}>
                <h4 className={classes.cardTitleWhite}>Individual Prices</h4>
              </div>

              <div style={{ float: "right" }}>
                <CustomInput
                  labelText="Search"
                  inputProps={{ onChange: this.search.bind(this) }}
                  formControlProps={{ style: { margin: 0 }, fullWidth: true }}
                />
              </div>
            </CardHeader>
            <CardBody>
              <Button color="warning" aria-label="add" justIcon round onClick={ this.new.bind(this)} >
                <AddIcon />
              </Button>
              <Table
                tableHeaderColor="primary"
                tableHead={['Hours', 'Amount', 'MercadoPago', 'Actions']}
                tableData={
                  individualPrices.map(price => {
                    return [
											price.period,
											price.amount,
                      <a target="_blank" href={price.mercadopago_link}>{price.mercadopago_link}</a>,
                      <div>
                        <Button color="primary" aria-label="edit" justIcon round onClick={ this.edit.bind(this, price)} >
                          <EditIcon />
                        </Button>
                      </div>
                    ]}
                  )
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PriceList);
