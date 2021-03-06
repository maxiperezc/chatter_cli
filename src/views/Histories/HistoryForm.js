import React from 'react'

// core components
import GridItem from "components/Grid/GridItem.js"
import GridContainer from "components/Grid/GridContainer.js"
import CustomInput from "components/CustomInput/CustomInput.js"
import CustomSelect from "components/CustomSelect/CustomSelect.js"
import DatePicker from "components/DateTime/DatePicker.js"
import CardBody from "components/Card/CardBody.js"


export default class HistoryForm extends React.Component {
  teacherToSelect(list){
    return list.map(function(item){ return { id: item.id, name: item.full_name } })
  }

  render() {
    const { history, onChange, teachers } = this.props
    if(!history) return null

    return(
      <CardBody>

        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomSelect
              labelText='Teacher'
              id='teacher'
              values={ this.teacherToSelect(teachers) }
              onChange={onChange}
              inputProps={{
                name: 'teacher_id',
                value: history.teacher_id || ''
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Event Id'
              id='event_id'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                onChange,
                name: 'event_id',
                value: history.event_id
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Duration'
              id='duration'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                onChange,
                name: 'duration',
                value: history.duration,
                type: 'number'
              }}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <DatePicker
              labelText='Started At'
              id='started_at'
              name='started_at'
              onChange={onChange}
              inputProps={{
                name: 'started_at',
                value: history.started_at
              }}
            />
          </GridItem>
        </GridContainer>

      </CardBody>
    )
  }
}
