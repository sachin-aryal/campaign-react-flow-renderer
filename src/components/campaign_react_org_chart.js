import React, {Component} from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ChartContainer from "./dabeng/ChartContainer";
import MyNode from "./my-node";


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ds = {
  id: "n1",
  name: "Lao Lao",
  children: [
    { id: "n2", name: "Bo Miao" },
    {
      id: "n3",
      name: "Su Miao",
      children: [
        { id: "n4", name: "Tie Hua" },
        {
          id: "n5",
          name: "Hei Hei",
          children: [
            { id: "n6", name: "Dan Dan"},
            { id: "n7", name: "Xiang Xiang" }
          ]
        },
        { id: "n8", name: "Pang Pang" }
      ]
    },
    { id: "n9", name: "Hong Miao"},
    {
      id: "n10",
      name: "Chun Miao",
      children: [{ id: "n11", name: "Yue Yue"}]
    }
  ]
};

class CampaignReactOrgChart extends Component {

  constructor(props) {
    super(props)
    let data = props.state
    data['flow_open'] = true
    data['scroll'] = 'paper'
    this.state = data
  }

  openDialogue = () => {
    this.setState({ flow_open: true })
  }

  treeElements(ruleName, rule, index=0){
    if(rule === undefined){
      return {}
    }
    let yes = rule['yes']
    let no = rule['no']
    let yesLabel = yes === rule['default_child_rule'] ? "YES/DEFAULT" : "YES"
    let noLabel = no === rule['default_child_rule'] ? "NO/DEFAULT" : "NO"

    let campaignName= this.props.campaignName
    let ruleStatus = "off"
    let ruleLabel = rule['label']
    let stateKey = [campaignName, ruleName, "enabled?"].join(':')

    if(rule['always_enabled'] === true || this.state[stateKey] === true){
      ruleStatus = "on"
    }
    let children1, children2
    let row = {
      id: ruleName + "_" + index,
      name: ruleLabel,
      status: ruleStatus
    }
    index = index+1
    if(no === "reject" || no === "exit"){
      children1 = {id: no+'_'+index, name: capitalizeFirstLetter(no), status: 'on'}
    }else{
      children1 = this.treeElements(no, this.props.rules[no], index)
    }
    index += 1
    if(yes === "reject" || yes === "exit"){
      children2 = {id: yes+'_'+index, name: capitalizeFirstLetter(yes), status: 'on'}
    }else{
      children2 = this.treeElements(yes, this.props.rules[yes], index)
    }
    row["children"] = [children1, children2]
    return row
  }

  render() {
    return (
        <div>
          <div className='campaign-flow-box'>
            <Button className="btn btn-info" onClick={this.openDialogue} color='primary'>
              Campaign Graph
            </Button>
            <Dialog
                open={this.state.flow_open}
                onClose={this.handleClose}
                scroll={this.state.scroll}
                aria-labelledby='scroll-dialog-title'
                fullWidth={true}
                maxWidth={"xl"}
            >
              <DialogTitle id='scroll-dialog-title' className='text-center'>
                <span>{this.props.campaignConfigHeading}</span>
              </DialogTitle>
              <DialogContent>
                <div style={{ height: 800}}>
                  <ChartContainer
                      datasource={this.treeElements("enable_campaign?", this.props.rules["enable_campaign?"])}
                      chartClass="myChart"
                      NodeTemplate={MyNode}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='primary'>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
    )
  }
}

export default CampaignReactOrgChart
